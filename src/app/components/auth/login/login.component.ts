import { Component, OnInit } from '@angular/core';
import { SharedUserService } from '../../shared/services/shared-user.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // email: string = "";
  // password: string = "";
  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  loginHandler() {
    this.auth.login(this.loginForm.value as LoginModel);
    this.loginForm.reset();
  }
}

