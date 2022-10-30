import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginModel,
  RegisterModel,
  SuccessfulAuthModel,
  UserModel,
} from '../models';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { SharedUserService } from '../../shared/services/shared-user.service';
import { CartService } from '../../cart/services/cart.service';
import { SharedCartService } from '../../shared/services/shared-cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userModel?: UserModel;
  constructor(
    private http: HttpClient,
    private router: Router,
    private shared: SharedUserService,
    private cart: CartService,
    private sharedCartService: SharedCartService,
  ) {}

  public login(user: LoginModel): any {
    try {
      return this.http
        .post<SuccessfulAuthModel>('http://localhost:3000/auth/login', user)
        .subscribe((data: any) => {
          if (data['accessToken']) {
            const user: any = jwt_decode(data.accessToken);
            const userModel: UserModel = {
              id: user['id'],
              email: user['email'],
              name: user['name'],
              role: user['role'],
              token: data['accessToken'],
              toeknExpirationDate: user['exp'],
            };
            this.shared.updateLoginValue = true;
            this.shared.updateUserValue = userModel;
            // console.log(this.shared.userValue);
            this.saveToken('token', data['accessToken']);
           
           
            this.router.navigate(['/store']);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  public register(newUser: RegisterModel): any {
    console.log(newUser);
    try {
      return this.http
        .post<SuccessfulAuthModel>(
          'http://localhost:3000/auth/register',
          newUser
        )
        .subscribe((data: any) => {
          if (data['accessToken']) {
            const user: any = jwt_decode(data.accessToken);
            console.log(user);
            this.userModel = {
              id: user['id'],
              email: user['email'],
              name: user['name'],
              role: user['role'],
              token: data['accessToken'],
              toeknExpirationDate: user['exp'],
            };
            this.shared.updateLoginValue = true;
            this.shared.updateUserValue = this.userModel;
            console.log(this.shared.userValue);
            this.saveToken('token', data['accessToken']);
            this.router.navigate(['/store']);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }


  private saveToken(tokenName:string, token: string): void {
    localStorage.setItem(tokenName, token);
  }
}
