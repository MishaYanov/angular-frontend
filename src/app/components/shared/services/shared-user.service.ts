import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../../auth/models';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  private decoded?:any;

  //base case.
  private _isLogged: boolean = false;
  private _user: UserModel = {
    id: undefined,
    email: undefined,
    name: undefined,
    role: "user",
    token: undefined,
    toeknExpirationDate: undefined
  };
  private user$ = new BehaviorSubject<UserModel>(this._user);
  private isLogged$ = new BehaviorSubject<boolean>(this._isLogged);
  private token:any = localStorage.getItem('token');
  
  
  constructor() {
    //in case of refresh or page reload
    if(this.token){
      this.decoded = jwt_decode(this.token);
      this.updateUserValue ={
        id: this.decoded.id,
        email: this.decoded.email,
        name: this.decoded.name,
        role: this.decoded.role,
        token: this.token,
        toeknExpirationDate: this.decoded.exp
      }
      this.updateLoginValue = true;
    }
  }
   
  set updateLoginValue(value: boolean) {
    this.isLogged$.next(value); 
  }

  get userValue(): UserModel{
    return this.user$.value;
  }

  set updateUserValue(value: UserModel) {
    this.user$.next(value);
  }

  get isLoggedObservable() {
    return this.isLogged$.asObservable();
  }

  get userObservable() {
    return this.user$.asObservable();
  }

  
}
