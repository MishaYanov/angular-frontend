import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemModel } from '../../cart/models/CartItem.model';
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
export class ItemComponent implements OnInit, DoCheck {
  public isAdmin: boolean = false;
  public ifExists: boolean = false;

  @Input() public product: ProductModel = {
    id: 0,
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
  ) { }

  ngOnInit(): void {
    this.shared.userObservable.subscribe((data) => {
      if (data.role == 'admin') {
        this.isAdmin = true;
      }
    });
    
  }

  ngDoCheck() {
    //check if item in cart
    this.ifExists = this.sharedCart.checkIfItemExistsInCart(this.product.id!);
    setTimeout(() => { this.ifExists = this.sharedCart.checkIfItemExistsInCart(this.product.id!);
    }, 1000);
  }

  editHandeler() {
    if (this.isAdmin && this.product.id) {
      this.router.navigate([`/admin/edit-product/${this.product.id}`]);
    }
  }

  async deleteHandler() {
    if (this.isAdmin && this.product.id) {
      await this.store.deleteProduct(this.product.id).subscribe((data: any) => {
        //update store
        this.sharedStore.removeProduct = data["id"];
      });
    }
  }

  async addItemTocart() {
    if (!this.sharedCart.cartValue.id && !this.product) {
      return;
    }
    if (this.ifExists) {
      //add 1 to quantity
      let curItemsInCart = this.sharedCart.cartValue?.cartItems!;
      //try find item in cart
      curItemsInCart.map((it) => {
        if (it.productId === this.product.id) {
          it.quantity!++;
          it.totalPrice = it.quantity! * it.product?.price!;
        }
      });
      this.sharedCart.updateCart = {
        ...this.sharedCart.cartValue, cartItems: curItemsInCart
      }
    } else {
      //add item to cart
      const cartItem: CartItemModel = {
        productId: this.product.id,
        quantity: 1,
        cartId: this.sharedCart.cartValue.id,
        totalPrice: this.product.price,
        product: this.product,
      };
      let curItemsInCart = this.sharedCart.cartValue?.cartItems!;
      if(curItemsInCart && curItemsInCart.length > 0){
        curItemsInCart.push(cartItem);
      }
      else{
        curItemsInCart = [cartItem];
      }
      this.sharedCart.updateCart = {
        ...this.sharedCart.cartValue, cartItems: curItemsInCart
      }
    }
    this.sharedCart.updateHandelr();
  }

  async deleteItemFromCart() {
    //check if item in cart
    let curItemsInCart = this.sharedCart.cartValue?.cartItems!;
    //try find item in cart
    let itemInCart = curItemsInCart.find((it) => it.productId === this.product.id);
    //if in cart remove it    
    if (itemInCart) {
      curItemsInCart = curItemsInCart.filter((it) => it.productId !== this.product.id);
      this.sharedCart.updateCart = {
        ...this.sharedCart.cartValue, cartItems: curItemsInCart
      }
      await this.cart.removeItemFromCart(this.sharedCart.cartValue.id!, itemInCart.id!).subscribe(
        async (data: any) => {
          if (data['msg'] === 'Item deleted') {
            await this.sharedCart.updateHandelr();
          }
        }
      );
    }

  }
}
