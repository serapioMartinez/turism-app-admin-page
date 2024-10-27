import { Injectable } from "@angular/core";

Injectable()
export interface PlaceEntity{
    idZona: number | null;
    _idCiudad: number | null;
    nombre: string | null;
    tipoZona: string | null;
    descripcion: string | null;
    imagen: string | null;
}