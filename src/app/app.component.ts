import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CtoolbarComponent } from './app/components/ctoolbar/ctoolbar.component';
import { LoginComponent } from './app/page/user/login/login.component';
import { LogingComponent } from './components/loging/loging.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CtoolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carwash';
}
