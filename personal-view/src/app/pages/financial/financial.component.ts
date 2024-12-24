import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { TableFinanicialComponent } from "../../components/table-finanicial/table-finanicial.component";
import { InputDateFinancialComponent } from "../../components/input-date-financial/input-date-financial.component";
import { LoginService } from '../../services/login.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [MatProgressSpinnerModule, TableFinanicialComponent, InputDateFinancialComponent],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss'
})
export class FinancialComponent {
  private _paidPercentage:number = 30;
  colorSpinner:string = 'accent'
  user:any = {};

  constructor ( private api: ApiService ) {}
  ngOnInit() {

  }


  set paidPercentage(newPercentage: number) {this._paidPercentage = newPercentage}
  get paidPercentage() {return this._paidPercentage;}
  get leftPercentage() {return 100 - this._paidPercentage}

}