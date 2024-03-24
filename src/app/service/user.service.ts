import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { UserResponse, userLogin } from '../models/user';
import { IJwt, ResponseGeneric } from '../models/commun';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) { }

  rutaApi: String = 'https://localhost:7052/api/User'

  login(user: userLogin): any {

    return this.http.post<UserResponse>(`${this.rutaApi}/login`, user);
  }
  refreshToken() {
    return this.http.get<ResponseGeneric>(`${this.rutaApi}/refresh`);
  }

  SetToken(objToken: IJwt): void {
    localStorage.setItem('jwt', JSON.stringify(objToken));
  }


}
