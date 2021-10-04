import { Pipe, PipeTransform } from '@angular/core';
import {ResultType} from '../../result-service/result.service';

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {

  transform(value: ResultType [], date: {date: Date}): ResultType[] {
    if (!value) return; // If value is empty exit the function
    // @ts-ignore
    return value.filter((d) => new Date(d.matchDate).toDateString() === new Date(date.date).toDateString());
  }

}
