import { Jugador } from "./jugador";

export class Torneo {
    id:string;
    name:string;
    sede: string;
    
    constructor(name:string = "", sede:string = "", id:string = null) {
        this.id = id
        this.sede = name
        this.name = name
    }
}