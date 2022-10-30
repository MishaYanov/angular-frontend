import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isExistInCart'
})
export class IsExistInCartPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
