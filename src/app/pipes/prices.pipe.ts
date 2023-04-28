import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prices'
})
export class PricesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

    return value.substring(0,value.length-2);
  }

}
