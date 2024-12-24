import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, inject, Input, SimpleChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'table-finanicial',
  standalone: true,
  imports: [FormsModule, CommonModule, MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table-finanicial.component.html',
  styleUrl: './table-finanicial.component.scss'
})
export class TableFinanicialComponent {
  dataSource: any | undefined = new MatTableDataSource<TransactionModel>([]);
  
  displayedColumns: string[] = ['reference', 'date', 'datePaid', 'source', 'card', 'description', 'value'];
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private api: ApiService, private login: LoginService) {}

    ngOnInit() {
      this.api.getTransactionsFromUser(this.login.getUserId()!).subscribe(response => {
        this.dataSource.data = response.data
      })
    }

    teste() {
      console.log(this.dataSource.data);
    }
}


export interface TransactionModel {
  id: string,
  value: string,
  type: number,
  date: string,
  reference: string,
  datePaid: string,
  card: string,
  description: string,
  user: null
}


