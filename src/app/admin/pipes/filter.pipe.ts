import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(objs: any, term: any): any {
    if (term === undefined) {
      return objs;
    }
    return objs.filter((obj: any) => {
      return (obj.firstName.toLowerCase().includes(term.toLowerCase()),
      obj.lastName.toLowerCase().includes(term.toLowerCase()),obj.email.toLowerCase().includes(term.toLowerCase()));
    });
  }

}
