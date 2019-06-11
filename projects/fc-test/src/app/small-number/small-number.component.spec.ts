import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallNumberComponent } from './small-number.component';

describe('SmallNumberComponent', () => {
  let component: SmallNumberComponent;
  let fixture: ComponentFixture<SmallNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
