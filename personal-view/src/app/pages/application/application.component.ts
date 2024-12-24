import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { FooterBarComponent } from "../../components/footer-bar/footer-bar.component";

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [NavComponent, RouterOutlet, FooterBarComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
}
