import { Entrenamiento } from "./entrenamiento";

export class Entrenador{
    id:string;
    nombre:string;
    calendarioEntrenamientos: Array<Entrenamiento>;

    constructor(){
        this.id= "";
        this.nombre = "";
        this.calendarioEntrenamientos = null;
    }
}