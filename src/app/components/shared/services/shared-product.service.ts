import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { carCategories, FiltersModel, partCategories, ProductModel } from '../../store/models';

@Injectable({
  providedIn: 'root'
})
export class SharedProductService {
  //filters
  private _filters:FiltersModel = {
    car: undefined,
    part: undefined,
    search: undefined,
  }
  private _products: ProductModel[] = [];
  
  public filters$ = new BehaviorSubject<FiltersModel>(this._filters);
  
  public products$ = new BehaviorSubject<ProductModel[]>(this._products);

  public carCategories$ = new BehaviorSubject<carCategories[]>([]);

  public partCategories$ = new BehaviorSubject<partCategories[]>([]);

  constructor() { }

  //filters
  set updateFilters(value: FiltersModel) {
    this.filters$.next(value);
  }
  get filtersObservable() {
    return this.filters$.asObservable();
  }

  get filtersValue(): FiltersModel {
    return this.filters$.value;
  }

  //products
  set updateProducts(value: ProductModel[]) {
    this.products$.next(value);
  }
  set addProduct(product: ProductModel) {
    this.products$.next([...this.products$.value, product]);
  }
  set removeProduct(id: string) {
    this.products$.next(this.products$.value.filter((product) => product.id !== parseInt(id)));
  }
  set updateProductInstance(product: ProductModel) {
    const index = this.products$.value.findIndex((p) => p.id === product.id);
    this.products$.value[index] = product;
    this.products$.next(this.products$.value);
  }
  get productsObservable() {
    return this.products$.asObservable();
  }
  get productsValue(): ProductModel[] {
    return this.products$.value;
  }

  //car categories
  set updateCarCategories(value: carCategories[]) {
    this.carCategories$.next(value);
  }
  get carCategoriesObservable() {
    return this.carCategories$.asObservable();
  }
  get carCategoriesValue(): carCategories[] {
    return this.carCategories$.value;
  }

  //part categories
  set updatePartCategories(value: partCategories[]) {
    this.partCategories$.next(value);
  }
  get partCategoriesObservable() {
    return this.partCategories$.asObservable();
  }
  get partCategoriesValue(): partCategories[] {
    return this.partCategories$.value;
  }

}
