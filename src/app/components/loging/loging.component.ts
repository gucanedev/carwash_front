import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { UserService } from '../../service/user.service';
import { UserResponse, userLogin } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loging',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule
    , ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './loging.component.html',
  styleUrl: './loging.component.css'
})
export class LogingComponent {
  hide = true;
  isLoad: boolean = false;
  messageError: string = '';
  objLogin: userLogin = {
    UserName: '',
    Password: ''
  }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginform = this.fb.group({
    username: [''],
    password: ['']
  });


  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private _router: Router) {

  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'El usuario es requerido ';
    }
    else return '';
  }

  getErrorMessagepsw() {
    if (this.password.hasError('required'))
      return 'password requerido';
    else return ''
  }


  async loginNet() {
    // https://www.youtube.com/watch?v=s1qgSzEtCRI       ver este video para los http interceptor
    const formValue = this.loginform.value;
    if (this.loginform.valid) {
      this.isLoad = true;
      this.messageError = '';
      this.objLogin.UserName = formValue.username!;
      this.objLogin.Password = formValue.password!;
      const loginreturn = await this._userService.login(this.objLogin)
        .subscribe({
          next: (response: UserResponse) => {
            console.log(response)
            if (response.isSuccess) {
              console.log('Exitoso')
              // localStorage.setItem('jwt', response.token);
              console.log(response)
              this.isLoad = false;
              this._router.navigate(['/lobby']);
            }
            else {
              this.messageError = response.message;

              this.isLoad = false;
            }

          },
          error: (er: any) => {
            this.isLoad = false;
            this.messageError = "Ocurrio un error al intentar Iniciar Sesión";
            // console.error('Ocurrio un error en bd!');
          }
        });
    }

  }


} //Final
