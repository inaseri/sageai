import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Product } from "../models/product/product";

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(products: Product[], args: string): any {
    if (!args) {
      return products;
    } else {
      return products.filter(product => product.days_to_reorder.toString() === args);
    }
  }
}
