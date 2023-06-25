import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'StringLength'
})
export class StringLengthPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    } else {
      return value;
    }
  }

}
