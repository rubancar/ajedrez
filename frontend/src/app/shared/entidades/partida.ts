import { Jugador } from "./jugador";

export class Partida {
    id:string;
    torneo_id: number;
    jugador1: Jugador;
    jugador2: Jugador;
    resultado: number;
    sede: string;

    constructor() {
        this.id = "";
        this.torneo_id = -1;
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        this.resultado = -1;
    }
}