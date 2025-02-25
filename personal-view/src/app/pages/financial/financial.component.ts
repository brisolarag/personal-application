import { Component, ElementRef, HostListener, inject, Renderer2, ViewChild } from '@angular/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { TableFinanicialComponent } from "../../components/table-finanicial/table-finanicial.component";
import { InputDateFinancialComponent } from "../../components/input-date-financial/input-date-financial.component";
import { LoginService } from '../../services/login.service';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../../components/modals/add-transaction/add-transaction.component';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [MatProgressSpinnerModule, TableFinanicialComponent, InputDateFinancialComponent],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss'
})
export class FinancialComponent {
  colorSpinner:string = 'accent'
  user:any = {};
  filter: { month: number | null | undefined; year: number | null | undefined } = { month: null, year: null };

  constructor(private api: ApiService, private login: LoginService) {}
  readonly dialog = inject(MatDialog);

  paidPercentage:number = 30;
  get leftPercentage() {return 100 - this.paidPercentage}

  onFilterChange(filter: { month: number | null | undefined; year: number | null | undefined }) {
    const month = filter.month == -1 ? null : filter.month! + 1;
    const year = filter.year == -1 ? null : filter.year!;
    this.filter = filter;
    this.api.getMonthInfo(this.login.getUserId()!, year, month).subscribe(response => {
      this.paidPercentage = response.data.percentage;
    }
    );
  }

  executeFunction() {
    this.openDialogAddTransaction();
    console.log('Shift + I was pressed!');
    // Sua lógica aqui
  }

  // Detectar eventos de teclado
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.shiftKey && event.key === 'I') {
      this.executeFunction();
      event.preventDefault(); // Evita comportamento padrão, se necessário
    }
  }


  openDialogAddTransaction() {
    const dialogAddTransaction = this.dialog.open(AddTransactionComponent);
    dialogAddTransaction.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}