import { Pipe, PipeTransform } from '@angular/core';
import { FiltersModel, ProductModel } from '../models';

@Pipe({
  name: 'multipleFilterPipe',
})
export class MultipleFilterPipePipe implements PipeTransform {
  transform(products: ProductModel[], invokedFilters: FiltersModel): any {
    //lazy filter only if invokedFilters is not empty
    if (invokedFilters.car) {
      products = products.filter((product: ProductModel) => {
        return product.carCategory.name === invokedFilters.car;
      });
    }
    if (invokedFilters.part) {
      products = products.filter((product: ProductModel) => {
        return product.partCategory.name === invokedFilters.part;
      });
    }
    if (invokedFilters.search) {
      products = products.filter((product: ProductModel) => {
        //keeping strict ts rules in mind
        //@ts-ignore
        return product.name.toLowerCase().includes(invokedFilters.search.toLowerCase());
      });
    }
    if (products.length > 0) {
      return products;
    }else{
      return products = [];
    }
  }
}
