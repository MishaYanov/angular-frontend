import { Component, ErrorHandler, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SharedCartService } from '../../shared/services/shared-cart.service';
import { SharedProductService } from '../../shared/services/shared-product.service';
import { FiltersModel } from '../models';
import { ProductModel } from '../models/product.model';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {

  public products: ProductModel[] = [];
  public invokedFilters!: FiltersModel;

  constructor(private storeService: StoreService, private sharedProd: SharedProductService, private cartService: SharedCartService) { }



  ngOnInit(): void {
    this.getAllProducts();
    this.sharedProd.filtersObservable.subscribe((data: FiltersModel) => {
      this.invokedFilters = data;
    });
  }
  
  //main function to get all products
  getAllProducts(){
    const observable = this.storeService.getProducts();
    observable.subscribe((data:any) => {
      this.sharedProd.updateProducts = data;
      if(this.sharedProd.productsValue.length > 0){
      this.sharedProd.productsObservable.subscribe((allProducts: ProductModel[]) => {
        this.products = allProducts;
      });
    }else{
      this.products = data;
    }
    }),
    (error: ErrorHandler) => {
      console.error(error);
    }
  }

  
}
