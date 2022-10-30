import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../auth/models';
import { SharedProductService } from '../../shared/services/shared-product.service';
import { SharedUserService } from '../../shared/services/shared-user.service';
import { carCategories, partCategories } from '../../store/models';
import { StoreService } from '../../store/services/store.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public user:UserModel = {
    id: undefined,
    email: undefined,
    name: undefined,
    role: undefined,
    token: undefined,
    toeknExpirationDate: undefined,
  }
  public carCategory: carCategories ={
    id: undefined,
    name: undefined,
  }
  public partCategories: partCategories ={
    id: undefined,
    name: undefined,
  };

  public addProducthandler: boolean = false;
  public addCarhandler: boolean = false;
  public addParthandler: boolean = false;


  constructor(private sharedUser: SharedUserService, private store: StoreService, sharedProd: SharedProductService) { }

  ngOnInit(): void {
    this.sharedUser.userObservable.subscribe((data) => {
      this.user = data;
    });
  }
  toggleAddForm() {
    if (this.addProducthandler) {
      this.addProducthandler = false;
    } else {
      this.addProducthandler = true;
      this.addCarhandler = false;
      this.addParthandler = false;
    }
  }
  toggleAddCarForm() {
    if (this.addCarhandler) {
      this.addCarhandler = false;
    } else {
      this.addCarhandler = true;
      this.addProducthandler = false;
      this.addParthandler = false;
    }
  }
  toggleAddPartForm() {
    if (this.addParthandler) {
      this.addParthandler = false;
    } else {
      this.addParthandler = true;
      this.addProducthandler = false;
      this.addCarhandler = false;
    }
  }
}
