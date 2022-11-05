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
  private _delivery: DeliveryModel ={
    id: undefined,
    city: undefined,
    address: undefined,
    userId: undefined,
    cartId: undefined,
    price: undefined
  }

  public cart$ = new BehaviorSubject<CartModel>(this._cart);

  public cartItems$ = new BehaviorSubject<CartItemModel[]>([]);

  public delivery$ = new BehaviorSubject<DeliveryModel>(this._delivery);
  
  public modalControl$ = new BehaviorSubject<boolean>(false);

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
  //modal control
  set updateModalControl(value: boolean) {
    this.modalControl$.next(value);
  }
  get modalControlValue(){
    return this.modalControl$.value;
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

  checkIfItemExistsInCart(id: number): boolean {
    let cart = this.cart$.value;
    let item = cart.cartItems?.find((item) => item.productId === id);
    if (item) {
      return true;
    } else {
      return false;
    }
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
          if(data){
          localStorage.setItem('cartToken', JSON.stringify(data));
          this.updateCart = data;
          this.updateCartItems = data.cartItems;
          this.updateDelivery = data.delivery;
        }else{
          console.log('no data');
          this.cartService.createCart(this.shared.userValue.id!).subscribe(
            (data: any) => {
              if(data){
              localStorage.setItem('cartToken', JSON.stringify(data));
              this.updateCart = data;
              this.updateCartItems = data.cartItems;
              this.updateDelivery = data.delivery;
            }else{
              console.log('no data');
            }
            }
          )
        }
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

  private updateCartForUser(newCart: any) {
    //remove old cart from local storage
    localStorage.removeItem('cartToken'); 
    //update cart in local storage
    localStorage.setItem('cartToken', JSON.stringify(newCart));
    this.updateCart = newCart;
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
      async (data: any) => {
        if(data){
          await this.cartService.getCart(this.shared.userValue.id!).subscribe(
            (data: any) => {
              if(data){
              this.updateCartForUser(data);
            }else{
              console.log('no data');
            }
            }
          );
      }else{
        console.log('no data');
      }
      });

  }

  resetCartForNewLogin(){
    this.cart$.next(this._cart);
    this.cartItems$.next([]);
    this.delivery$.next(this._delivery);
  }


  async resetCart(){
    let cart = this.cart$.value;
    cart.cartItems?.forEach(async (item) => {
      await this.cartService.removeItemFromCart(cart.id!, item.id!).subscribe(
        async (data: any) => {
          if(!data['msg']){
           throw new Error('error removing item from cart');
        }else{
          console.log(data['msg']);
        }
        });
    });
    this.cart$.next(this._cart);
    this.cartItems$.next([]);
    this.delivery$.next(this._delivery);
  }
  }
