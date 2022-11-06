import { Component, DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedCartService } from '../../shared/services/shared-cart.service';
import { CartModel } from '../models/cart.model';
import { CartItemModel } from '../models/CartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {

  private cartDiffrenceDetector?: KeyValueDiffer<string, any>;
  public cartItems: CartItemModel[] = [];

  public totalPrice: number = 0;
  public totalItems: number = 0;


  constructor(private shareCart: SharedCartService, private Cdiff: KeyValueDiffers, private router: Router, private route: ActivatedRoute, ) { }

  async ngOnInit(): Promise<void> {
    await this.checkIfCartExists();
    this.cartItems = this.shareCart.cartValue?.cartItems!;
    if(this.cartItems && this.cartItems?.length > 0){
    this.cartDiffrenceDetector = this.Cdiff.find(this.cartItems).create();
    }
  }

  private async checkIfCartExists() {
    if(this.cartItems && this.cartItems?.length === 0 ){
      await this.shareCart.pullCartForUser()
      this.cartItems = this.shareCart.cartValue?.cartItems!;
    }
  }
  ngDoCheck() {
    const changes = this.cartDiffrenceDetector?.diff(this.cartItems);
    if(this.cartItems && this.cartItems?.length > 0){
      this.totalPrice =0;
      this.totalItems = 0;
    this.cartItems?.forEach((item: CartItemModel) => {
      this.totalItems += item.quantity!;
      this.totalPrice += item.totalPrice!;
    });
  }
    if(this.cartItems?.length === 0){
      this.cartItems = this.shareCart.cartValue?.cartItems!;
    }
  }
  InvokeCheckout(){
    if(this.cartItems?.length > 0){
    this.router.navigate(['/checkout'], {relativeTo:this.route});
    } else {
      alert('Cart is empty');
    }
  }
  async resetCart(){
    await this.shareCart.resetCart();
    this.totalItems = 0;
    this.totalPrice = 0;
    this.cartItems = [];
  }
}
