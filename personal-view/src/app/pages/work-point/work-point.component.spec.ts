import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPointComponent } from './work-point.component';

describe('WorkPointComponent', () => {
  let component: WorkPointComponent;
  let fixture: ComponentFixture<WorkPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
