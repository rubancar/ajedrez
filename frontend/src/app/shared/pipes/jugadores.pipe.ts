import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jugadores'
})
export class JugadoresPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {

    if (value.name != undefined) {
      return value.name as string;
    } else {
      return value as string;
    }
  }

}
