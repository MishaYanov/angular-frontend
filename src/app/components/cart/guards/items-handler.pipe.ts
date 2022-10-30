import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsHandler'
})
export class ItemsHandlerPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
