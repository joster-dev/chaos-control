import { Directive, ElementRef, inject, Input, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { filter, from, interval, map, Subject, Subscription, take, takeUntil } from 'rxjs';
import { BusyComponent } from '../components';

@Directive({
    selector: '[ccBusy]'
})
export class BusyDirective {
  private element = inject<ElementRef>(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  private renderer = inject(Renderer2);

  @Input('ccBusy') asyncEvents?: Subscription | Subscription[] | Promise<any> | Promise<any>[];

  host: HTMLElement = this.element.nativeElement;
  insertedNode?: Node;
  endSubscription$ = new Subject<void>();
  busySubscription?: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asyncEvents'].currentValue) {
      const valueArray = Array.isArray(changes['asyncEvents'].currentValue)
        ? changes['asyncEvents'].currentValue
        : [changes['asyncEvents'].currentValue];

      const subscriptionValueArray = valueArray
        .filter(item => Boolean(item))
        .map(item => {
          if (item instanceof Promise) {
            return from(item).subscribe();
          }
          return item;
        });

      if (subscriptionValueArray.length > 0) {
        if (this.busySubscription && !this.busySubscription.closed) {
          this.endSubscription$.next();
        }
        this.addSpinner(subscriptionValueArray);
      }
    }
  }

  ngOnDestroy(): void {
    this.endSubscription$.complete();
  }

  private addSpinner(asyncEvents: Subscription[]): void {
    const componentRef = this.viewContainerRef.createComponent(BusyComponent);
    this.insertedNode = this.host.insertBefore(componentRef.location.nativeElement, this.host.firstChild);
    this.renderer.addClass(this.host, 'position-relative');
    this.renderer.addClass(this.host, 'overflow-hidden');
    this.busySubscription = interval()
      .pipe(
        map(() => asyncEvents.every(item => item.closed)),
        filter(everySubscriptionClosed => Boolean(everySubscriptionClosed)),
        take(1),
        takeUntil(this.endSubscription$),
      )
      .subscribe(({
        complete: () => {
          this.removeSpinner();
        },
        error: () => {
          this.removeSpinner();
        },
      }));
  }

  private removeSpinner(): void {
    if (this.insertedNode)
      this.host.removeChild(this.insertedNode);
    this.renderer.removeClass(this.host, 'position-relative');
    this.renderer.removeClass(this.host, 'overflow-hidden');
  }
}
