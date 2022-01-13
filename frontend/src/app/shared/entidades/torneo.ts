import { Jugador } from "./jugador";
import { Partida } from "./partida";

export class Torneo {
    id:string;
    name:string;
    sede: string;
    partidas: Partida[] = []
    
    constructor(name:string = "", sede:string = "", id:string = null) {
        this.id = id
        this.sede = sede
        this.name = name
    }
}