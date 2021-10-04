import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findByKeyValue'
})
export class FindByKeyValuePipe implements PipeTransform {

  transform(value: Array<{[key: string]: any}>, key: string, cmpValue: string): any {
    if (!value) return; // If value is empty exit the function
    return value.find(val => val[key] === cmpValue);
  }

}
