import { EntrenamientosDia } from "./entrenamientosDia";

export class Entrenador{
    id:string;
    nombre:string;
    calendarioEntrenamientos: Array<EntrenamientosDia>;

    constructor(){
        this.id= "";
        this.nombre = "";
        this.calendarioEntrenamientos = null;
    }
}