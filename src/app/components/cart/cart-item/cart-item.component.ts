import { Component, Input, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { SharedCartService } from '../../shared/services/shared-cart.service';
import { CartItemModel } from '../models/CartItem.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: '[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  private itemDiff?: KeyValueDiffer<string, any>;

  public curAmount?:number;

  @Input() public cartItem: CartItemModel = {
    id: 0,
    productId: 0,
    product: {
      id: 0,
      name: "",
      price: 0,
      description: "",
      image: "",
      carCategory: "",
      partCategory: "",
    },
    cartId: 0,
    price: 0,
    quantity: 0,
    totalPrice: 0,
  };


  constructor(private sharedCart: SharedCartService, private cart: CartService, private Idiff: KeyValueDiffers ) { }

  ngOnInit(): void {
    this.itemDiff = this.Idiff.find(this.cartItem).create();
  }

  async changeAmount(event:any){
    if(event.target.value < 0){
      event.target.value = 0;
    }
    this.curAmount = event.target.value;
  }

  async amountHandler() {
    if(this.curAmount === undefined){
      return;
    }
    if(this.curAmount == 0){
      this.removeItem();
    }else{
      let allCartItems = this.sharedCart?.cartValue?.cartItems!;
    allCartItems.map((item) => {
      if (item.id === this.cartItem.id) {
        item.quantity = +this.curAmount!;
        item.totalPrice = item.product?.price! * item.quantity!;
      }
    });    

    //update cart in db
    this.sharedCart.updateCart = {
      ...this.sharedCart.cartValue, cartItems: allCartItems
    }
    
    await this.sharedCart.updateHandelr();
    this.cartItem.quantity = +this.curAmount!;
    this.cartItem.totalPrice = this.cartItem.product?.price! * this.cartItem.quantity!;    
    }
    
  }

  async removeItem() {
    //remove item from cart
    const allCartItems = this.sharedCart.cartValue?.cartItems!;
    const newCart = allCartItems.filter((item) => item.id !== this.cartItem.id);
    this.sharedCart.updateCart = {
      ...this.sharedCart.cartValue, cartItems: newCart
    }
    await this.cart.removeItemFromCart(this.sharedCart.cartValue.id! ,this.cartItem.id!).subscribe(
      (data:any) => {
        if(data['msg'] === 'Item deleted'){
        this.sharedCart.updateHandelr();
        }
      }
    );
  }

}
