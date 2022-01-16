export class Club {

    id: string;
    nombre: string;
    direccion: string;
    entrenador_id: string;
    // TODO:cambiar federacion de string a clase federacion
    federacion_id: string;

    constructor(id: string="", nombre: string="", direccion: string="", entrenador_id: string="",
    federacion_id: string = ""){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.entrenador_id = entrenador_id;
        this.federacion_id = federacion_id;
    }

}