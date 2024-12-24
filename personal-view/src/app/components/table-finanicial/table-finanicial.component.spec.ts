import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFinanicialComponent } from './table-finanicial.component';

describe('TableFinanicialComponent', () => {
  let component: TableFinanicialComponent;
  let fixture: ComponentFixture<TableFinanicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFinanicialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFinanicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
