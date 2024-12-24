import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(private router: Router, private api: ApiService) {}
  user: any = {};
  urls = {
    workPointCalculator: '/work-point-calculator',
    college: '/college',
    work: '/work',
    financial: '/financial',
    healthy: '/healthy'
  }

  ngOnInit() {
    this.api.getUserId(localStorage.getItem("userId")!).subscribe(response => this.user = response.data);
    console.log(this.user);
  }


  urlMatch = (url:string) => this.router.url == url;
  go = (url: string) => this.router.navigateByUrl(url);


}
