export class Club {

    id: string;
    nombre: string;
    direccion: string;
    usuario_entrenador: string;
    // TODO:cambiar federacion de string a clase federacion
    federacion_id: string;

    constructor(id: string="", nombre: string="", direccion: string="", usuario_entrenador: string="",
    federacion_id: string = ""){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.usuario_entrenador = usuario_entrenador;
        this.federacion_id = federacion_id;
    }

}