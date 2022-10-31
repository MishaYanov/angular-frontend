import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedCartService } from '../../shared/services/shared-cart.service';
import { SharedUserService } from '../../shared/services/shared-user.service';
import { CartModel } from '../models/cart.model';
import { CartItemModel } from '../models/CartItem.model';
import { DeliveryModel } from '../models/delivery.model';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Output() completeCart: any = {};

  deliveryForm: any = new FormGroup({
    city: new FormControl(),
    address: new FormControl(),
  });

  public Cmodal = this.sharedCart.modalControlValue;
  //add cart model use shared-cart
  public cart?: CartModel;
  public totalPrice: number = 0;
  public totalItems: number = 0;
  //add delivery model and shared-cart
  public newDelivery = new FormGroup({
    city: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });
  public user?: any;

  constructor(
    private sharedUser: SharedUserService,
    private sharedCart: SharedCartService
  ) {}

  ngOnInit(): void {
    //check if cart exists? no - pull cart

    this.sharedCart.cartObservable.subscribe((data: any) => {
      this.cart = data;
      console.log(this.cart);
      data.cartItems?.forEach((item: CartItemModel) => {
        this.totalItems += item.quantity!;
        this.totalPrice += item.totalPrice!;
      });
    });
    this.checkIfCartExists();
    this.user = this.sharedUser.userValue;
    console.log(this.user);
  }
  private async checkIfCartExists() {
    if (this.cart?.cartItems?.length === 0) {
      await this.sharedCart.pullCartForUser();
    }
  }
  async invokeSavedAddress() {
    const decoded: any = await this.decodeUserToken();
    console.log(decoded);
    if (decoded) {
      this.newDelivery.setValue({
        city: decoded.city,
        address: decoded.address,
      });
    }
  }

  resetDelivery() {
    this.newDelivery.reset();
  }

  async saveDelivery() {
    const decoded: any = await this.decodeUserToken();
    console.log(decoded);
    if (this.newDelivery.valid) {
      const decoded: any = await this.decodeUserToken();
      console.log(decoded);
      const newDelivery: DeliveryModel = {
        city: this.newDelivery.value.city!,
        address: this.newDelivery.value.address!,
        price: this.totalPrice,
        userId: decoded.id,
        cartId: this.cart?.id,
      };
      console.log(newDelivery);
    } else {
      console.log('invalid form');
    }
  }

  async saveAndExit() {
    await this.saveDelivery();
    //navigate to store
  }

  deleteCartAndDelivery() {
    //reset fields.
    //delete cart + create new cart
  }

  submitInfo() {
    this.Cmodal = true;
    this.sharedCart.updateModalControl = this.Cmodal;
  }

  private async decodeUserToken() {
    if (this.user && this.user.token) {
      const decodedToken = jwt_decode(this.user.token);
      console.log(decodedToken);
      return decodedToken;
    } else {
      return null;
    }
  }
}
