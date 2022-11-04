import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewProductModel } from '../models';
import { ProductModel } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:3000/store/');
  }
  public createProduct(product: NewProductModel):  Observable<NewProductModel>{
    return this.http.post<NewProductModel>('http://localhost:3000/store/', product);
  }

  public updateProduct(product: ProductModel, id:number): Observable<any> {
    console.log(product);
    return this.http.put<any>(`http://localhost:3000/store/${id}`, product);
  }

  public deleteProduct(id: number): any {
    return this.http.delete(`http://localhost:3000/store/${id}`);
  }

  public getCategories(): any {
    return this.http.get('http://localhost:3000/store/part/categories');
  }

  // public createCategory(category: any): any {}

  // public deleteCategory(id: string): any {}

  public getCarTypes(): any {
    return this.http.get('http://localhost:3000/store/car/categories');
  }

  // public createCarType(carType: any): any {}

  // public deleteCarType(id: string): any {}

  public addImage(image: any): any {    
    return this.http.post('http://localhost:3000/store/upload', image);
  }

  public updateImage(image: any, id: string): any {
    return this.http.put(`http://localhost:3000/store/image/${id}`, image);
  }

  public deleteImage(id: string): any {
    return this.http.delete(`http://localhost:3000/store/image/${id}`);
  }
}
