import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'input-date-financial',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule],
  templateUrl: './input-date-financial.component.html',
  styleUrl: './input-date-financial.component.scss',

})
export class InputDateFinancialComponent {
  notSelected = -1;
  private readonly _today = new Date();
  @Output() filterChange = new EventEmitter<{ month: number | null | undefined; year: number | null | undefined }>();

  
  years = [2022, 2023, 2024];
  readonly monthsString = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  monthControl = new FormControl(this._today.getMonth());
  yearControl = new FormControl(this._today.getFullYear());

  filter = new FormGroup({
    month: this.monthControl,
    year: this.yearControl 
  });

  ngOnInit() {
    this.filterChange.emit({ month: this.filter.value.month, year: this.filter.value.year });
  }
  
  constructor() {
    this.filter.valueChanges.subscribe((value) => {
      this.filterChange.emit({ month: value.month, year: value.year });
    });
  }
  
  nextMonth() {
    let month = this.monthControl.value == -1 ? this._today.getMonth() : this.monthControl.value;
    let year = this.yearControl.value == -1 ? this._today.getFullYear() : this.yearControl.value;

    if (month === 11) {
      this.updateMonthAndYear(0, year! + 1);
    } else {
      this.updateMonthAndYear(month! + 1, year!);
    }
  }

  previousMonth() {
    let month = this.monthControl.value == -1 ? this._today.getMonth() : this.monthControl.value;
    let year = this.yearControl.value == -1 ? this._today.getFullYear() : this.yearControl.value;

    if (month == 0) {
      this.updateMonthAndYear(11, year! - 1);
    } else {
      this.updateMonthAndYear(month! - 1, year!);
    }
  }

  resetFilter = () => this.updateMonthAndYear(this._today.getMonth(), this._today.getFullYear());

  private updateMonthAndYear(month: number, year: number) {

    if (!this.years.includes(year)) {
      this.years.push(year);
    }
    this.monthControl.setValue(month, { emitEvent: false });
    this.yearControl.setValue(year, { emitEvent: false });
    this.filter.updateValueAndValidity({ emitEvent: true });
  }

}


