import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorProviderService {

  constructor() { }

  public get error_message(): string | undefined {
    return ErrorProviderService._error_message;
  }
  public set error_message(value: string | undefined) {
    ErrorProviderService._error_message = value;
  }

  public get page_refresh(): string | undefined {
    return ErrorProviderService._page_refresh;
  }
  public set page_refresh(value: string | undefined) {
    ErrorProviderService._page_refresh = value;
  }

  private static _error_message: string | undefined;
  
  private static _page_refresh: string | undefined = '/app/auth/login';
  
}
