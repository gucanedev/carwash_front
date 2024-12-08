import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthUserService } from '../../../service/auth-user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-ctoolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './ctoolbar.component.html',
  styleUrl: './ctoolbar.component.css'
})
export class CtoolbarComponent {


  _auth = inject(AuthUserService);
  _route = inject(Router)


  logOutC() {
    this._auth.logOut();
    this._route.navigateByUrl('login')
  }
}
