import { Injectable } from "@angular/core";

Injectable()
export interface MealEntity{
    idPlatillo: number | null;
    idCiudad: number | null;
    nombre: string | null;
    descripcion: string | null;
}