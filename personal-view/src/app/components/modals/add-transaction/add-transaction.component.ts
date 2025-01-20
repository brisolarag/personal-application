import { LiveAnnouncer } from '@angular/cdk/a11y';
import {ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatChipsModule, 
    FormsModule,
    ReactiveFormsModule, 
    MatDatepickerModule, 
    MatSelectModule,
    MatCheckboxModule,   
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent {
  value: number = 0;

  announcer = inject(LiveAnnouncer);

  readonly dialogRef = inject(MatDialogRef);
  onCancelClick(): void {
    this.dialogRef.close();
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  transactionTypeControl = new FormControl(0);
  transactionAmout = new FormControl(0);
  transactionDate = new FormControl(new Date());
  transactionDatePaid = new FormControl(null);
  transactionSource = new FormControl('');
  transactionCard = new FormControl('');
  transactionDescription = new FormControl('');

  notPaidCheckbox = new FormControl(false);



  get colorTitle() {
    return this.transactionTypeControl.value == 0 ? 'green' : 'red';
  }
}
