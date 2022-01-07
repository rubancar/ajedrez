import { Jugador } from "./jugador";

export class Partida {
    id:number;
    tournament_id: number;
    jugador1: Jugador;
    jugador2: Jugador;
    resultado: number;
    fecha: Date;
    sede: string;

    constructor() {
        this.id = -1;
        this.tournament_id = -1;
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        this.fecha = null;
        this.resultado = -1;
    }
}