import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDateFinancialComponent } from './input-date-financial.component';

describe('InputDateFinancialComponent', () => {
  let component: InputDateFinancialComponent;
  let fixture: ComponentFixture<InputDateFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDateFinancialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDateFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
