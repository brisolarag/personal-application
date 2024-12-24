import { Routes } from '@angular/router';
import { ApplicationComponent } from './pages/application/application.component';
import { FinancialComponent } from './pages/financial/financial.component';
import { WorkPointComponent } from './pages/work-point/work-point.component';
import { ProvLoginComponent } from './pages/prov-login/prov-login.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = 
[
    {path: '', component: ApplicationComponent, canActivate: [AuthService] ,children: [
        {path: 'financial', component: FinancialComponent},
        {path: 'work-point-calculator', component: WorkPointComponent},
        
    ]},
    {path: 'login', component: ProvLoginComponent},
];
