import { Jugador } from "./jugador";
import { Partida } from "./partida";

export class Torneo {
    id:string;
    name:string;
    sede: string;
    partidas: Partida[] = []
    jugadores: string[] = []
    
    constructor(name:string = "", sede:string = "", id:string = null, jugadores:string[] = []) {
        this.id = id
        this.sede = sede
        this.name = name
        this.jugadores = jugadores
    }
}