import { Injectable } from "@angular/core";


@Injectable()
export class Globals{
    static isUserLogged:boolean |undefined;
    static userType:string |undefined;
    static username:string|undefined;

    static readonly paginationHeaderes = {
        "count": "PAGINATION-COUNT",
        "page": "PAGINATION-PAGE",
        "limit" : "PAGINATION-LIMIT"
    }
}