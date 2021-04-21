import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {

  transform(objs: any, term: any): any {
    if (term === undefined) {
      return objs;
    }
    return objs.filter((obj: any) => {
      return (obj.productName.toLowerCase().includes(term.toLowerCase()));
    })
  }
}
