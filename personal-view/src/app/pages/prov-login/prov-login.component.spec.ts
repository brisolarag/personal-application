import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvLoginComponent } from './prov-login.component';

describe('ProvLoginComponent', () => {
  let component: ProvLoginComponent;
  let fixture: ComponentFixture<ProvLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
