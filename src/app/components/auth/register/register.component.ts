import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../models';
import { AuthService } from '../services/auth.service';
import { PasswordValidators } from '../validators/password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      idNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    { validators: PasswordValidators.checkPasswords }
  );

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get name() {
    return this.registerForm.get('name');
  }
  get idNumber() {
    return this.registerForm.get('idNumber');
  }
  get address() {
    return this.registerForm.get('address');
  }
  get city() {
    return this.registerForm.get('city');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  registerHandler() {
    if (this.registerForm.valid && this.registerForm.touched) {
      try {
        const observable = this.auth.register(
          this.registerForm.value as RegisterModel
        );
        observable.subscribe((data: any) => {
        });
      this.registerForm.reset();
      } catch (err) {
        console.error(err);
      }
    }

  }
}
