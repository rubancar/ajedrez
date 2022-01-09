import { Entrenamiento } from "./entrenamiento";

export class EntrenamientosDia{
    fecha:String;
    entrenamiento1: Entrenamiento;
    entrenamiento2: Entrenamiento;
    entrenamiento3: Entrenamiento;
    entrenamiento4: Entrenamiento;

    constructor(){
        this.fecha = "";
        this.entrenamiento1 = null;
        this.entrenamiento2 = null;
        this.entrenamiento3 = null;
        this.entrenamiento4 = null;
    }
}