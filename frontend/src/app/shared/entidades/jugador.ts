export class Jugador{
    id: string;
    name: string;
    usuario: string;
    password: string;
    elo: number;
    responsable: string;
    es_moroso: boolean;
    fecha_nacimiento: any;
    club: any;

    constructor(id: string="", name: string="", usuario: string="", password: string="", elo: number=-1, responsable: string="",
                es_moroso: boolean=false, fecha_nacimiento: any=null, club: any=null){
        this.id = id;
        this.name = name;
        this.usuario = usuario;
        this.password = password;
        this.elo = elo;
        this.responsable = responsable;
        this.es_moroso = es_moroso;
        this.fecha_nacimiento = fecha_nacimiento;
        this.club = club;
    }

}