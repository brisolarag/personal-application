import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-prov-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './prov-login.component.html',
  styleUrl: './prov-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvLoginComponent {
  users:any[] = [];

  constructor(private api: ApiService, private login: LoginService, private router:Router) {}

  ngOnInit(): void {
    if (this.login.isUserLoggedIn()) {
      this.router.navigateByUrl('');
    }

    this.api.getUsers().subscribe(response => {
      this.users = response.data;
    })
  }

  onUserSelect(event: any): void {
    const id = event.value;
    this.login.login(id)
    this.router.navigateByUrl('')
  }


}
