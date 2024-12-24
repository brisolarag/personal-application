import { Component } from '@angular/core';
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
  private readonly _today = new Date();



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

  


  nextMonth() {
    let month = this.monthControl.value ?? this._today.getMonth();
    let year = this.yearControl.value ?? this._today.getFullYear();
    console.log(this.filter.value)

    if (month == 11) {
      const nextYear = year + 1;
      if (!this.years.includes(nextYear)) {this.years.push(nextYear)}
      month = 0;
      year++;
    } else {
      month++;
    }
    this.monthControl.setValue(month);
    this.yearControl.setValue(year);
  }

  previousMonth() {
    let month = this.monthControl.value ?? this._today.getMonth();
    let year = this.yearControl.value ?? this._today.getFullYear();

    if (month == 0) {
      const previousYear = year - 1;
      if (!this.years.includes(previousYear)) {this.years.push(previousYear)}
      month = 11;
      year--;
    } else {
      month --;
    }
    this.monthControl.setValue(month);
    this.yearControl.setValue(year);
  }

  resetFilter() {
    this.monthControl.setValue(this._today.getMonth());
    this.yearControl.setValue(this._today.getFullYear());
  }


}


