import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormBuilder, ReactiveFormsModule, NgForm, FormGroupDirective, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor() {
  }


  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passControl = new FormControl('', [Validators.required]);
  hide = true;
  // emailControl = new FormControl('', [Validators.required, Validators.email]);
  // passControl = new FormControl('', [Validators.required]);

  loginform = new FormGroup({
    emailControl: this.emailControl,
    passControl: this.passControl,

  })
  // loginform = this.fb.group({
  //   emailControl: [''],
  //   passControl: ['']
  // });
  matcher = new MyErrorStateMatcher();

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'El campo es requerido';
    }
    return this.emailControl.hasError('email') ? 'Ingrese un correo valido' : '';
  }


  getErrorMessagepassword() {
    if (this.emailControl.hasError('required')) {
      return 'El campo es requerido';
    }

    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  login() {
    console.log(this.loginform.controls.emailControl);
    console.log(this.emailControl)
    console.log(this.loginform.value.emailControl);
    // const formValue = this.loginform.value;
    // console.log(formValue);
    // if (this.loginform.valid) {
    //   console.log('Formulario valido')
    // }
  }
}
