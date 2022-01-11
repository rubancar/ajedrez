import { Jugador } from "./jugador";

export class Torneo {
    id:string;
    nombre:string;
    sede: string;

    constructor() {
        this.id = "";
        this.sede = "";
        this.nombre = "";
    }
}