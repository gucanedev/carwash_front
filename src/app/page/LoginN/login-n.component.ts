import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../service/user.service';
import { userLogin } from '../../models/user';

@Component({
  selector: 'app-login-n',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-n.component.html',
  styleUrl: './login-n.component.css',
})
export class LoginNComponent {
  hide = true;
  isLoad = false;
  messageError = '';

  currentYear = new Date().getFullYear();

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

  login(): void {
    if (this.loginForm.invalid) return;

    this.isLoad = true;
    this.messageError = '';

    const credentials: userLogin = {
      UserName: this.loginForm.value.username!,
      Password: this.loginForm.value.password!,
    };

    this._userService.login(credentials).subscribe({
      next: (response: any) => {
        this.isLoad = false;
        if (response.isSuccess) {
          this._userService.SetToken(response.result.tokenData);
          this._userService.SetRoles(response.result.roles);
          this._router.navigate(['/lobby']);
        } else {
          this.messageError = response.message;
        }
      },
      error: () => {
        this.isLoad = false;
        this.messageError = 'Ocurrió un error al intentar iniciar sesión';
      },
    });
  }
}
