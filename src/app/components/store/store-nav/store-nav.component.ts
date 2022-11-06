import { Component, DoCheck, IterableDiffers, KeyValueDiffer, OnInit, Output } from '@angular/core';
import { defaultRippleAnimationConfig } from '@angular/material/core';
import { CartItemComponent } from '../../cart/cart-item/cart-item.component';
import { CartService } from '../../cart/services/cart.service';
import { SharedCartService } from '../../shared/services/shared-cart.service';
import { SharedProductService } from '../../shared/services/shared-product.service';
import { SharedUserService } from '../../shared/services/shared-user.service';
import { carCategories, FiltersModel, partCategories } from '../models';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-store-nav',
  templateUrl: './store-nav.component.html',
  styleUrls: ['./store-nav.component.scss'],
})
export class StoreNavComponent implements OnInit, DoCheck {
  public carCategories: carCategories[] = [];
  public partCategories: partCategories[] = [];
  public cartItems: CartItemComponent[] = [];

  public selectedCar?: any;
  public selectedPart?: any;
  public searchValue?: string;

  public userName = this.shared.userValue.name;
  public cartItemsCounter?:any = 0;

  constructor(
    private shared: SharedUserService,
    private store: StoreService,
    private sharedProd: SharedProductService,
    private sharedCart: SharedCartService,
  ) {}




  async ngOnInit(): Promise<void> {
    //init car and part categories for filter
    this.store.getCategories().subscribe(
      (data: partCategories[]) => {
        this.partCategories = data;
        this.sharedProd.updatePartCategories = data;
      },
      (err: any) => {
        console.error(err);
      }
    );
    this.store.getCarTypes().subscribe(
      (data: carCategories[]) => {
        this.carCategories = data;
        this.sharedProd.updateCarCategories = data;
      },
      (err: any) => {
        console.error(err);
      }
    );
    //get cart and update cart fileds
    if(!this.sharedCart?.cartValue?.cartItems || this.sharedCart?.cartValue?.cartItems?.length === 0){
      await this.sharedCart.pullCartForUser();
    }
    this.sharedCart.cartObservable.subscribe((data: any) => {
      this.cartItems = data.cartItems;
    });
    this.cartItemsCounter = this.cartItems?.length;
  }
  
  ngDoCheck(){
    //update cart items counter
    if(this.cartItems?.length > 0){
      this.cartItemsCounter = this.cartItems?.length;
    }
  }
  
  setSearchValue(event: any): void {
    this.searchValue = event.target?.value;
  }

  FilterHandler() {
    const appliedFilters: FiltersModel = {
      car: this.selectedCar,
      part: this.selectedPart,
      search: this.searchValue,
    };
    this.sharedProd.updateFilters = appliedFilters;
    this.selectedCar = undefined;
    this.selectedPart = undefined;
    this.searchValue = undefined;
  }
  resetHandler() {
    const appliedFilters: FiltersModel = {
      car: undefined,
      part: undefined,
      search: undefined,
    };
    this.selectedCar = undefined;
    this.selectedPart = undefined;
    this.searchValue = undefined;
    this.sharedProd.updateFilters = appliedFilters;
  }

  
}
