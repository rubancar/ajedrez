import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultadoPartida'
})
export class ResultadoPartidaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if (value == undefined) {
      return "Pendiente";
    } else if (value == "Tablas") {
      return "Tablas";
    } else {
      if (value == args[0].id) {
        return `Ganó ${args[0].name}`
      } else {
        return `Ganó ${args[1].name}`
      }
    }
  }

}
