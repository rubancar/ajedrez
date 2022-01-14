import { Jugador } from "./jugador";

export class Partida {
    id:string;
    torneo_id: string;
    jugador1: Jugador;
    jugador2: Jugador;
    resultado: string;
    sede: string;

    constructor() {
        this.id = "";
        this.torneo_id = null;
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        this.resultado = "Pendiente";
    }
}