export interface Usuario {
    username:string;
    password:string;
}

export interface Viaje{
    rut:string;
    nombre:string;
    fono:string;
    partida:string;
    destino:string;
    valor:string;
    hora:string;
    id: string;

}

export interface User{
    uid: string;
    email: string; 
    displayName: string;
    emailVerified: boolean;
}
