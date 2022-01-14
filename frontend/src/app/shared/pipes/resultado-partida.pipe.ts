import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultadoPartida'
})
export class ResultadoPartidaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value.resultado != undefined) {
      return value.name as string;
    } else {
      return value as string;
    }
  }

}
