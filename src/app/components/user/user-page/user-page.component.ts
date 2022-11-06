import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public user:any;

  constructor() {
    
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token!);    
    this.user = decoded;
  }

}
