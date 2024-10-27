import { Injectable } from '@angular/core';

@Injectable()
export class CityEntity {
    idCiudad: number | undefined;
    nombreCiudad: string | undefined;//
    region: string | undefined;//
    municipio: string | undefined;//
    correo: string | undefined;//
    telefono: string | undefined;//
    urlMaps: string | null = null;
    puebloMagico: boolean | undefined;
    emergencias: string | undefined;
    calificacion: number = 0;
    cantidadCalificaciones: number = 0;
    descripcion: string | undefined;
    imagenRepresentativa: string | undefined;
    tipoTurismo: Array<any> = ["NT"];
}