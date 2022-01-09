import { Club } from "./club";
import { Jugador } from "./jugador";

export class Entrenamiento{
    jugador1:Jugador;
    jugador2:Jugador;
    club: Club;

    constructor(){
        this.jugador1 = null;
        this.jugador2 = null;
        this.club = null;
    }
}