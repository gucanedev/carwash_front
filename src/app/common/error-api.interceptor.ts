import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { EMPTY, catchError, concatMap, empty, throwError } from 'rxjs';
import { AuthUserService } from '../service/auth-user.service';
import { inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

export const errorApiInterceptor: HttpInterceptorFn = (req, next) => {


  const _auth = inject(AuthUserService);
  const _userServ = inject(UserService);
  const _route = inject(Router)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === HttpStatusCode.Unauthorized) {
        const tokenRefresh = _auth.getRefreshToken();
        let jwtRefresh = req.clone({
          setHeaders: { Authorization: 'Bearer ' + tokenRefresh }
        })
        return _userServ.refreshToken().pipe(
          concatMap((res) => {
            _auth.SetToken(res.result)
            console.log('**** se refresco el token**')
            return next(jwtRefresh)
          }),
          catchError(() => {
            console.log('vencio el refreshtoken')
            _route.navigateByUrl('login')
            return EMPTY;
          })
        )
      }

      return throwError(() => error)
    })
  );
};
