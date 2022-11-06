import { ChangeDetectionStrategy, Component, Directive, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { SharedUserService } from '../../shared/services/shared-user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: any = false;
  public role: any = "";
  
  //detect if user logged in for onChanges

  constructor(private shared: SharedUserService, private router: Router) {}

  ngOnInit(): void {
      this.shared.isLoggedObservable.subscribe((data) => {
        this.isLoggedIn = data;
      });
      
      this.shared.userObservable.subscribe((data) => {
        this.role = data.role;
      });
  }

  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('cartToken');
    this.shared.updateLoginValue = false;
    this.isLoggedIn = false;
    this.shared.updateUserValue = {
      id: undefined,
      email: undefined,
      name: undefined,
      role: undefined,
      token: undefined,
      toeknExpirationDate: undefined,
      };
    this.router.navigate(['/']);
  }
}
