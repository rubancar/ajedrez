import { Jugador } from "./jugador";

export class Partida {
    id:number;
    tournament_id: number;
    jugadores: Jugador[];
    resultado: JSON;
    fecha: Date;
    sede: string;

    constructor(){
        this.id = -1;
        this.tournament_id = -1;
        this.jugadores = [];
        this.fecha = null;
        this.resultado = null;
    }
}