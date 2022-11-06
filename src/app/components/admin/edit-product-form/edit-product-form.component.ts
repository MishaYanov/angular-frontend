import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SharedProductService } from '../../shared/services/shared-product.service';
import { ProductModel } from '../../store/models';
import { StoreService } from '../../store/services/store.service';
import { ProductValidator } from '../validators/product.validator';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit {
  id!: number;
  product?: ProductModel;
  public carCategories: any = [];
  public partCategories: any = [];
  public selectedCar?: any;
  public selectedPart?: any;

  public NewValuesForm = new FormGroup({
    id: new FormControl(this.id),
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    price: new FormControl(0, [Validators.min(0)]),
    description: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(500),
    ]),
    carCategoryId: new FormControl('', []),
    partCategoryId: new FormControl('', []),
    image: new FormControl('', [ProductValidator.imageTypeValidator]),
  });
  get form() {
    return this.NewValuesForm.controls;
  }

  constructor(
    private router: Router,
    private store: StoreService,
    private sharedProducts: SharedProductService
  ) {
    // this.id = parseInt(window.location.pathname.split('/')[3]);
    // this.sharedProducts.productsObservable.subscribe((data) => {
    //   //find the product by id in the products array
    //   this.product = data.find((product) => product.id === this.id);
    // });
  }

  ngOnInit(): void {
    this.resetValues();
    this.id = parseInt(window.location.pathname.split('/')[3]);
    this.sharedProducts.productsObservable.subscribe((data) => {
      //find the product by id in the products array
      this.product = data.find((product) => product.id === this.id);
    });
    if (this.sharedProducts.carCategoriesValue.length > 0) {
      this.sharedProducts.carCategoriesObservable.subscribe((data: any) => {
        this.carCategories = data;
      });
    } else {
      //incase of refresh call in admin page call and set the value
      this.store.getCarTypes().subscribe((data: any) => {
        this.carCategories = data;
        this.sharedProducts.updateCarCategories = data;
      });
    }
    if (this.sharedProducts.partCategoriesValue.length > 0) {
      this.sharedProducts.partCategoriesObservable.subscribe((data: any) => {
        this.partCategories = data;
      });
    } else {
      this.store.getCategories().subscribe((data: any) => {
        this.partCategories = data;
        this.sharedProducts.updatePartCategories = data;
      });
    }
  }
  private getProductById(): void {
    this.id = parseInt(window.location.pathname.split('/')[3]);
    this.sharedProducts.productsObservable.subscribe((data) => {
      //find the product by id in the products array
      this.product = data.find((product) => product.id === this.id);
    });
  }

  private setUpUndeitedValues(): void {
    const carCategoryId = this.carCategories.find(
      (carCategory: any) => carCategory.name === this.product?.carCategory.name
    );
    const partCategoryId = this.partCategories.find(
      (partCategory: any) =>
        partCategory.name === this.product?.partCategory.name
    );

    if (this.NewValuesForm.value.id === null) {
      this.NewValuesForm.value.id = this.product?.id;
    }
    if (this.NewValuesForm.value.name === null) {
      this.NewValuesForm.value.name = this.product?.name;
    }
    if (this.NewValuesForm.value.price === null) {
      this.NewValuesForm.value.price = this.product?.price;
    }
    if (this.NewValuesForm.value.description === null) {
      this.NewValuesForm.value.description = this.product?.description;
    }
    if (this.NewValuesForm.value.carCategoryId === null) {
      this.NewValuesForm.value.carCategoryId = carCategoryId.id;
    }
    if (this.NewValuesForm.value.partCategoryId === null) {
      this.NewValuesForm.value.partCategoryId = partCategoryId.id;
    }
    if (this.NewValuesForm.value.image === null) {
      this.NewValuesForm.value.image = this.product?.image;
    }
  }

  public editProduct(): void {
    if (this.product === undefined) {
      this.getProductById();
    }
    this.setUpUndeitedValues();
    this.store
      .updateProduct(this.NewValuesForm.value as ProductModel, this.id)
      .subscribe((data) => {
        this.sharedProducts.updateProductInstance = data;
        this.router.navigate(['/admin']);
      });
  }
  public resetValues(): void {
    this.NewValuesForm.reset();
  }
  public cancel(): void {
    this.resetValues();
    this.router.navigate(['/admin']);
  }
}
