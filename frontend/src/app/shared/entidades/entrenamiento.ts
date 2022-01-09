import { Club } from "./club";
import { Jugador } from "./jugador";

export class Entrenamiento{
    fecha:any;
    franjaHoraria:number;
    jugador1:Jugador;
    jugador2:Jugador;
    club: Club;

    constructor(){
        this.fecha= Date.now();
        this.franjaHoraria = 0;
        this.jugador1 = null;
        this.jugador2 = null;
        this.club = null;
    }
}