import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

export const authloginInterceptor: HttpInterceptorFn = (req, next) => {

  const _auth = inject(AuthUserService);

  let token = _auth.getToken();
  let RefreshToken = _auth.getRefreshToken();
  const urlLogin = "http://localhost:4200/login";
  const urlRefresh = "https://localhost:7052/api/User/refresh";
  let stokenC = req.url === urlRefresh ? RefreshToken : token;

  if (req.url === urlLogin)
    return next(req);
  else {
    let jwtoken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + stokenC
      }
    });
    return next(jwtoken);
  }

};
