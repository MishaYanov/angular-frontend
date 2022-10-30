import { Component, Input, OnInit } from '@angular/core';
import { SharedUserService } from '../../shared/services/shared-user.service';

@Component({
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.scss']
})
export class StoreLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
