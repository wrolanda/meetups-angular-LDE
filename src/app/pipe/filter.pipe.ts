import { Pipe, PipeTransform } from '@angular/core';
import { Meetup } from '../entities/meetup';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue: string): any {

    if (!searchValue) return value;
    return value.filter((card: Meetup) => 
    card.name.indexOf(searchValue.toLowerCase()) > -1 || 
    card.description.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
    card.owner.fio.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}