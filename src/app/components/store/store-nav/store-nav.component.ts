import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class StoreNavComponent implements OnInit {
  public carCategories: carCategories[] = [];
  public partCategories: partCategories[] = [];


  public selectedCar?: any;
  public selectedPart?: any;
  public searchValue?: string;

  constructor(
    private shared: SharedUserService,
    private store: StoreService,
    private sharedProd: SharedProductService,
    private sharedCart: SharedCartService
  ) {}

  public userName = this.shared.userValue.name;
  public cartItemsCounter? = 0;



  async ngOnInit(): Promise<void> {
    this.store.getCategories().subscribe(
      (data: partCategories[]) => {
        this.partCategories = data;
        this.sharedProd.updatePartCategories = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.store.getCarTypes().subscribe(
      (data: carCategories[]) => {
        this.carCategories = data;
        this.sharedProd.updateCarCategories = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
    //get cart and update cart fileds
    await this.sharedCart.pullCartForUser();
    console.log(this.sharedCart.cartValue);
    
    this.sharedCart.cartObservable.subscribe((data) => {
      console.log(data);
      
      this.cartItemsCounter = data?.cartItems?.length;
    });
    console.log(this.cartItemsCounter, this.sharedCart.cartItemsValue);
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
