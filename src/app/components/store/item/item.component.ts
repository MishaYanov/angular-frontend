import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../cart/services/cart.service';
import { SharedCartService } from '../../shared/services/shared-cart.service';
import { SharedProductService } from '../../shared/services/shared-product.service';
import { SharedUserService } from '../../shared/services/shared-user.service';
import { ProductModel } from '../models/product.model';
import { StoreService } from '../services/store.service';

@Component({
  selector: '[app-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  public isAdmin: boolean = false;

  @Input() public product: ProductModel = {
    image: 'https://via.placeholder.com/100',
    name: 'item',
    price: 0,
    description: 'description',
    carCategory: 'carCategory',
    partCategory: 'partCategory',
  };

  constructor(
    private shared: SharedUserService,
    private router: Router,
    private store: StoreService,
    private sharedStore: SharedProductService,
    private sharedCart: SharedCartService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.shared.userObservable.subscribe((data) => {
      if (data.role == 'admin') {
        this.isAdmin = true;
      }
    });
  }
  editHandeler() {
    console.log(this.product);
    if (this.isAdmin && this.product.id) {
      this.router.navigate([`/admin/edit-product/${this.product.id}`]);
    }
  }
  deleteHandler() {
    console.log(this.product.id);
    if (this.isAdmin && this.product.id) {
      this.store.deleteProduct(this.product.id).subscribe((data:any) => {
        console.log(data);
        //update store
        this.sharedStore.removeProduct = data["id"];
      });
    }
  }
  addItemTocart() {
    //check if item in cart
    const curItemsInCart = this.sharedCart.cartItemsValue;
    let itemInCart = false;
    curItemsInCart.map((it) => {
      console.log(it);
      if (it.productId === this.product.id) {
        it.quantity = it.quantity! + 1;
        it.totalPrice = it.product?.price! * it.quantity!;
        itemInCart = true;
        // this.cart.updateCartItem(it);
      }
    });
    //if not in cart add it
    if (!itemInCart) {
      const cartItem = {
        productId: this.product.id,
        quantity: 1,
        cartId: this.sharedCart.cartValue.id,
        totalPrice: this.product.price,
        product: this.product,
      };
      this.sharedCart.updateCartItems = [...curItemsInCart, cartItem];
      this.sharedCart.updateCart = {
        ...this.sharedCart.cartValue, cartItems: [...curItemsInCart, cartItem]
      }
      this.sharedCart.updateHandelr();
    }else if(itemInCart){
      this.sharedCart.updateCartItems = curItemsInCart;
      this.sharedCart.updateCart = {
        ...this.sharedCart.cartValue, cartItems: curItemsInCart
      }
      this.sharedCart.updateHandelr();
    }
  }

  deleteItemFromCart() {
    //check if item in cart
    let curItemsInCart = this.sharedCart.cartItemsValue;
    //try find item in cart
    let itemInCart = curItemsInCart.find((it) => it.productId === this.product.id);
    //if in cart remove it    
    if (itemInCart) {
      curItemsInCart = curItemsInCart.filter((it) => it.productId !== this.product.id);
      this.sharedCart.updateCartItems = curItemsInCart;
      this.sharedCart.updateCart = {
        ...this.sharedCart.cartValue, cartItems: curItemsInCart
      }
      this.cart.removeItemFromCart(this.sharedCart.cartValue.id! ,itemInCart.id!).subscribe(
        (data:any) => {
          console.log(data['msg']);
          if(data['msg'] === 'Item deleted'){
            this.sharedCart.updateHandelr();
          }
        }
      );
    }

  }
}
