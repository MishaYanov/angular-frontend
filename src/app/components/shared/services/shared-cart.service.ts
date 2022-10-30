import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartModel } from '../../cart/models/cart.model';
import { CartItemModel } from '../../cart/models/CartItem.model';
import { DeliveryModel } from '../../cart/models/delivery.model';
import { CartService } from '../../cart/services/cart.service';
import { SharedUserService } from './shared-user.service';

@Injectable({
  providedIn: 'root',
})
export class SharedCartService {
  private _cartItems: CartItemModel[] = [];

  private _cart: CartModel = {
    id: undefined,
    userId: undefined,
    delivery: undefined,
    cartItems: this._cartItems,
  };

  public cart$ = new BehaviorSubject<CartModel>(this._cart);

  public cartItems$ = new BehaviorSubject<CartItemModel[]>([]);

  public delivery$ = new BehaviorSubject<DeliveryModel>({});

  constructor(
    private cartService: CartService,
    private shared: SharedUserService
  ) {}

  //cart
  set updateCart(value: CartModel) {
    this.cart$.next(value);
    // this.updateLocalStorage();
  }

  get cartObservable() {
    return this.cart$.asObservable();
  }

  get cartValue(): CartModel {
    return this.cart$.value;
  }

  // cart items
  set updateCartItems(value: CartItemModel[]) {
    this.cartItems$.next(value);
  }

  get cartItemsObservable() {
    return this.cartItems$.asObservable();
  }

  get cartItemsValue(): CartItemModel[] {
    return this.cartItems$.value;
  }

  //delivery
  set updateDelivery(value: DeliveryModel) {
    this.delivery$.next(value);
  }

  get deliveryObservable() {
    return this.delivery$.asObservable();
  }

  get deliveryValue(): DeliveryModel {
    return this.delivery$.value;
  }

  updateLocalStorage() {
    localStorage.setItem('cartToken', JSON.stringify(this.cartValue));
  }

  async pullCartForUser() {
    const curCart = localStorage.getItem('cartToken');
    if (curCart?.length !== 0) {
      //this is invoked after login so it is safe to assume there is either a cart with items or an empty cart
      await this.cartService.getCart(this.shared.userValue.id!).subscribe(
        (data: any) => {
          localStorage.setItem('cartToken', JSON.stringify(data));
          this.updateCart = data;
          this.updateCartItems = data.cartItems;
          this.updateDelivery = data.delivery;
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      this.updateCart = JSON.parse(curCart);
      this.updateCartItems = JSON.parse(curCart).cartItems;
      this.updateDelivery = JSON.parse(curCart).delivery;
    }
  }

  private async updateCartForUser(newCart: any) {
    //remove old cart from local storage
    localStorage.removeItem('cartToken'); 
    //update cart in local storage
    localStorage.setItem('cartToken', JSON.stringify(newCart));
    this.updateCart = newCart;
    console.log(newCart);
    this.updateCartItems = newCart.cartItems;
    this.updateDelivery = newCart.delivery;

  }
  
  async updateHandelr(){
    const newCart = {
      id: this.cartValue.id,
      userId: this.cartValue.userId,
      delivery: this.cartValue.delivery,
      cartItems: this.cartValue.cartItems,
    };
    console.log(newCart);
    await this.cartService.updateCart(this.cartValue.id!, newCart).subscribe(
      (data: any) => {
        if(data){
        console.log(data);
        debugger
       this.updateCartForUser(data);
      }else{
        console.log('no data');
      }
      });
  }

  async resetCart(){
    let cart = this.cart$.value;
    cart.cartItems?.forEach(async (item) => {
      await this.cartService.removeItemFromCart(cart.id!, item.id!).subscribe(
        (data: any) => {
          if(data){
          console.log(data);
          this.updateCartForUser(data);
        }else{
          console.log('no data');
        }
        });
    });
  }
}
