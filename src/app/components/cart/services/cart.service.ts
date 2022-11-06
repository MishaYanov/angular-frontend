import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedCartService } from '../../shared/services/shared-cart.service';
import { CartItemModel } from '../models/CartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public getCart(userId: number): any {
    return this.http.get(`http://localhost:3000/cart/${userId}`);
  }

  public createCart(userId: number): any {
    return this.http.post(`http://localhost:3000/cart/${userId}`, {});
  }
  
  public updateCart(userId: number, cart: any): any {    
    return this.http.put(`http://localhost:3000/cart/${userId}`, cart);
  }

  public addItemToCart(cartId: number, cartItem: CartItemModel): any {
    return this.http.post(`http://localhost:3000/cart/${cartId}/cartItem`, cartItem);
  }

public removeItemFromCart(cartId: number, cartItemId: number): any {
    return this.http.delete(`http://localhost:3000/cart/${cartId}/cartItem/${cartItemId}`)
  }

  public deleteCart(id: number): any {
    return this.http.delete(`http://localhost:3000/cart/${id}`);
  }
  public removeDelivery(id: number): any{
    return this.http.delete('http://localhost:3000/cart/delivery/:id');
  }
}
