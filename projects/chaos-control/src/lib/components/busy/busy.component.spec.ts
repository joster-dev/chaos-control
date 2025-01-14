import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyComponent } from './busy.component';

describe('BusyComponent', () => {
  let component: BusyComponent;
  let fixture: ComponentFixture<BusyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
