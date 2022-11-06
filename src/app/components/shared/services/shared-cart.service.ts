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
  constructor(
    private cartService: CartService,
    private shared: SharedUserService
  ) { }


  private _cartItems: CartItemModel[] = [];

  private _cart: CartModel = {
    id: undefined,
    userId: this.shared.userValue.id,
    delivery: {},
    cartItems: this._cartItems,
  };

  public cart$ = new BehaviorSubject<CartModel>(this._cart);

  public modalControl$ = new BehaviorSubject<boolean>(false);



  //cart
  set updateCart(value: CartModel) {
    this.cart$.next(value);
  }

  get cartObservable() {
    return this.cart$.asObservable();
  }

  get cartValue(): CartModel {
    return this.cart$.value;
  }
  //modal control
  set updateModalControl(value: boolean) {
    this.modalControl$.next(value);
  }
  get modalControlValue() {
    return this.modalControl$.value;
  }

  checkIfItemExistsInCart(id: number): boolean {
    let cart = this.cart$.value;
    let item = cart.cartItems?.find((item) => item.productId === id);
    if (item) {
      return true;
    } else {
      return false;
    }
  }

  async pullCartForUser() {
    try {
      //this is invoked after login so it is safe to assume there is either a cart with items or an empty cart
      await this.cartService.getCart(this.shared.userValue.id!).subscribe(
        (data: any) => {
          if (data) {
            this.updateCart = data;
          } else {
            this.cartService.createCart(this.shared.userValue.id!).subscribe(
              (data: any) => {
                this.updateCart = data;
              }
            )
          }
        },
        (err: any) => {
          console.error(err);
        }
      );
    } catch (err) {
      console.error('no user!');
    }
  }

  //The most important function in the cart.
  //It checks if the item exists in the cart and if it does it updates the quantity.
  //If it doesn't it adds the item to the cart.
  //also updates/addes the delivery
  async updateHandelr() {
    const newCart = {
      id: this.cartValue.id,
      userId: this.cartValue.userId,
      delivery: this.cartValue.delivery,
      cartItems: this.cartValue.cartItems,
    };
    await this.cartService.updateCart(this.shared.userValue?.id!, newCart).subscribe(
      async (data: any) => {
        if (data["msg"] === 'Cart updated') {
          this.cartService.getCart(this.shared.userValue?.id!).subscribe(
            (data: any) => {
              if (data) {
                this.updateCart = data;
              }
            });
        } else {
          console.error('no data');
        }
      });

  }

  resetCartForNewLogin() {
    this.cart$.next(this._cart);
  }

  
  async resetCart() {
    let cart = this.cart$.value;
    cart.cartItems?.forEach(async (item) => {
      await this.cartService.removeItemFromCart(cart.id!, item.id!).subscribe(
        async (data: any) => {
          if (!data['msg']) {
            throw new Error('error removing item from cart');
          } else {
            console.error(data['msg']);
          }
        });
    });
    this.cart$.next(this._cart);
  }
}
