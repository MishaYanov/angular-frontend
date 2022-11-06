import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedCartService } from '../../shared/services/shared-cart.service';
import { SharedUserService } from '../../shared/services/shared-user.service';
import { CartModel } from '../models/cart.model';
import { CartItemModel } from '../models/CartItem.model';
import { DeliveryModel } from '../models/delivery.model';
import jwt_decode from 'jwt-decode';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Output() completeCart: any = {};

  deliveryForm: any = new FormGroup({
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  public Cmodal = false;

  //add cart model use shared-cart
  public cart?: CartModel | any;
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
    private sharedCart: SharedCartService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    //check if cart exists? no - pull cart
    this.sharedCart.cartObservable.subscribe((data: any) => {
      this.cart = data;
      this.totalPrice = 0;
      this.totalItems = 0;
      data.cartItems?.forEach((item: CartItemModel) => {
        this.totalItems += item.quantity!;
        this.totalPrice += item.totalPrice!;
      });
    });
    this.checkIfCartExists();
    this.user = this.sharedUser.userValue;
  }
  private async checkIfCartExists() {
    if (this.cart?.cartItems?.length === 0) {
      await this.sharedCart.pullCartForUser();
    }
  }

  async invokeSavedAddress() {
    if (this.cart?.delivery[0] && this.cart?.delivery[0]?.city && this.cart?.delivery[0]?.address) {
      this.newDelivery.setValue({
        city: this.cart?.delivery[0].city,
        address: this.cart?.delivery[0].address,
      });
    } else {
      const decoded: any = await this.decodeUserToken();
      if (decoded) {
        this.newDelivery.setValue({
          city: decoded.city,
          address: decoded.address,
        });
      }
    }

  }

  resetDelivery() {
    this.newDelivery.reset();
  }

  async saveDelivery() {
    if (this.newDelivery.valid) { //validation
      const decoded: any = await this.decodeUserToken();
      const newDelivery: DeliveryModel = {
        city: this.newDelivery.value.city!,
        address: this.newDelivery.value.address!,
        price: this.totalPrice,
        userId: decoded.id,
        cartId: this.cart?.id,
      };
      if (newDelivery) {
        this.sharedCart.cartValue.delivery = newDelivery;
        this.sharedCart.updateCart = {
          ...this.sharedCart.cartValue, delivery: newDelivery
        }

        this.sharedCart.updateHandelr();
      }
      alert("New delivery saved!")
    } else {
      alert('invalid form');
    }
  }

  async saveAndExit() {
    try {
      await this.saveDelivery();
    } catch (err) {
      console.error("error in delvivery update: " + err)
    }
    //navigate to store
    this.router.navigate(['/store']);
  }

  async deleteCartAndDelivery() {
    //reset fields.
    //delete cart + create new cart
    if (this.cart?.cartItems?.length > 0) {
      await this.sharedCart.resetCart();
      this.totalItems = 0;
      this.totalPrice = 0;
      const response = await this.cartService.removeDelivery(this.sharedUser.userValue.id!);
      alert("CART RESETTED! you have nothing to do here please return to store")
    }
  }

  async submitInfo() {
    if (this.newDelivery.valid && this.cart?.cartItems?.length > 0) {
      this.saveDelivery();
      await this.sharedCart.updateHandelr();
      this.Cmodal = true;
    } else {
      alert("please fill all fields and add items to cart")
    }
  }

  private async decodeUserToken() {
    if (this.user && this.user.token) {
      const decodedToken = jwt_decode(this.user.token);
      return decodedToken;
    } else {
      return null;
    }
  }
  closeModalHandler() {
    this.Cmodal = false;
  }
}
