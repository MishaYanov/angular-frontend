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

  ngOnInit(): void {
    this.checkIfCartExists();
    this.shareCart.cartObservable.subscribe((data: any) => {
      this.cartItems = data.cartItems;
    });
    // this.cartItems = this.shareCart.cartItemsValue;
    this.cartDiffrenceDetector = this.Cdiff.find(this.cartItems).create();
  }
  private checkIfCartExists() {
    if(this.cartItems.length === 0 ){
      this.shareCart.pullCartForUser();
    }
  }
  ngDoCheck() {
    const changes = this.cartDiffrenceDetector?.diff(this.cartItems);
    if (changes) {
      console.log(changes);
      
      // this.cartItems = this.shareCart.cartItemsValue;
    }
  }
  InvokeCheckout(){
    console.log('checkout');
    
    this.router.navigate(['/checkout'], {relativeTo:this.route});
  }
  resetCart(){
    this.shareCart.resetCart();
  }
}
