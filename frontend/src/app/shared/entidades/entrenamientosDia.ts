import { Entrenamiento } from "./entrenamiento";

export class EntrenamientosDia{
    fecha:Date;
    entrenamiento1: Entrenamiento;
    entrenamiento2: Entrenamiento;
    entrenamiento3: Entrenamiento;
    entrenamiento4: Entrenamiento;

    constructor(){
        this.fecha = new Date();
        this.entrenamiento1 = null;
        this.entrenamiento2 = null;
        this.entrenamiento3 = null;
        this.entrenamiento4 = null;
    }
}