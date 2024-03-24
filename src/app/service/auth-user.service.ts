import { Injectable } from '@angular/core';
import { IJwt } from '../models/commun';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor() { }


  SetToken(objToken: IJwt): void {
    localStorage.setItem('jwt', JSON.stringify(objToken));
  }


  getToken(): string | null {
    const storedate = localStorage.getItem('jwt');
    if (storedate != null) {
      const obj = JSON.parse(storedate);
      return obj.token
    } else
      return null;

  }

  getRefreshToken(): string | null {
    const storedate = localStorage.getItem('jwt');
    if (storedate != null) {
      const obj = JSON.parse(storedate);
      return obj.tokenRefresh
    } else
      return null;

  }
}
