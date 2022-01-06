export class Jugador{
    id:number;
    name: string;
    usuario: string;
    elo: number;
    responsable: string;
    es_moroso: boolean;
    fecha_nacimiento: any;
    club: any;

    constructor(){
        this.id = -1;
        this.name = "";
        this.usuario = "";
        this.elo = 0;
        this.responsable = "";
        this.es_moroso = false;
        this.fecha_nacimiento = null;
        this.club = null;
    }
}