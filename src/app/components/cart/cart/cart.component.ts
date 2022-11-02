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


  constructor(private shareCart: SharedCartService, private Cdiff: KeyValueDiffers, private router: Router, private route: ActivatedRoute, ) { }

  async ngOnInit(): Promise<void> {
    await this.checkIfCartExists();
    // this.shareCart.cartObservable.subscribe((data: any) => {
    //   this.cartItems = data.cartItems;
    // });
    this.cartItems = this.shareCart.cartItemsValue;
    this.cartDiffrenceDetector = this.Cdiff.find(this.cartItems).create();
  }
  private async checkIfCartExists() {
    if(this.cartItems.length === 0 ){
      await this.shareCart.pullCartForUser()
      this.cartItems = this.shareCart.cartItemsValue;
    }
  }
  ngDoCheck() {
    const changes = this.cartDiffrenceDetector?.diff(this.cartItems);
    if (changes || this.cartItems.length === 0) {
      this.cartItems = this.shareCart.cartItemsValue;
    }
  }
  InvokeCheckout(){
    console.log('checkout');
    
    this.router.navigate(['/checkout'], {relativeTo:this.route});
  }
  async resetCart(){
    await this.shareCart.resetCart();
    this.cartItems = this.shareCart.cartItemsValue;
  }
}
