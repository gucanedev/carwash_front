import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

export const authloginInterceptor: HttpInterceptorFn = (req, next) => {

  const _auth = inject(AuthUserService);
  const _route = inject(Router)


  let token = _auth.getToken();
  let RefreshToken = _auth.getRefreshToken();
   const urlRefresh = "https://www.gucanedev.com/api/User/login"
  // const urlLogin = "https://www.gucanedev.com/api/User/login"
  const urlLogin = "http://localhost:5052/api/User/login"
  // const urlRefresh = "http://localhost:5052/api/User/refresh";
  let stokenC = req.url === urlRefresh ? RefreshToken : token;
console.log(req.url,'url req')
console.log(urlLogin,'url urlLogin')


  if (req.url === urlLogin)
    return next(req);
  else {

    if (_auth.hasLogin() == false) {
      console.log('No tiene token')
      _route.navigateByUrl('login')
      return EMPTY;
    }
    let jwtoken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + stokenC
      }
    });
    return next(jwtoken);
  }

};
