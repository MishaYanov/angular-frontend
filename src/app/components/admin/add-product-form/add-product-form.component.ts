import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedProductService } from '../../shared/services/shared-product.service';
import { NewProductModel, ProductModel } from '../../store/models';
import { StoreService } from '../../store/services/store.service';
import { ProductValidator } from '../validators/product.validator';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {

  public carCategories: any = [];
  public partCategories: any = [];
  public selectedCar?:any;
  public selectedPart?:any;

  public newProductForm= new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    price: new FormControl('',[
      Validators.required,
      Validators.min(0),

    ]),
    description: new FormControl('',[
      Validators.minLength(3),
      Validators.maxLength(500),
    ]),
    carCategoryId: new FormControl('',[
      Validators.required,
    ]),
    partCategoryId: new FormControl('',[
      Validators.required,
    ]),
    image: new FormControl('',[
      ProductValidator.imageTypeValidator,
    ]),
  
  });

  get form(){
    return this.newProductForm.controls;
  }



  constructor(private store: StoreService, private router: Router, private sharedProduct: SharedProductService,) { }

  ngOnInit(): void {
    if(this.sharedProduct.carCategoriesValue.length > 0){
    this.sharedProduct.carCategoriesObservable.subscribe((data: any) => {
      this.carCategories = data;
    });
  }else{ //incase of refresh call in admin page call and set the value
    this.store.getCarTypes().subscribe((data: any) => {
      this.carCategories = data;
      this.sharedProduct.updateCarCategories = data;
    });
  }
  if(this.sharedProduct.partCategoriesValue.length > 0){
    this.sharedProduct.partCategoriesObservable.subscribe((data: any) => {
      this.partCategories = data;
    });
  }else{
    this.store.getCategories().subscribe((data: any) => {
      this.partCategories = data;
      this.sharedProduct.updatePartCategories = data;
    });
  }
  }
  addProduct(){
    // console.log(this.newProductForm);
    // if(this.newProductForm.valid){
      try{
        const response: any = this.store.createProduct(this.newProductForm.value as NewProductModel).subscribe((data: any) => {
          //add product to store to all the products
          // console.log(data);
          if(data){
            this.sharedProduct.addProduct = data;
          }else{
            console.error('no data');
          }
        });
        // console.log(response);
      }catch(err){
        console.log(err);
      }
  }
  reset(){
    this.newProductForm.reset();
  }

}