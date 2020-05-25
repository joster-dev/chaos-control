import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ColorButtonComponent;
  let fixture: ComponentFixture<ColorButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
