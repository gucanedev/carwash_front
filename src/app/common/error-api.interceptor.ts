import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { EMPTY, catchError, concatMap, empty, switchMap, throwError } from 'rxjs';
import { AuthUserService } from '../service/auth-user.service';
import { inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

export const errorApiInterceptor: HttpInterceptorFn = (req, next) => {


  const _auth = inject(AuthUserService);
  const _userServ = inject(UserService);
  const _route = inject(Router)
  let contador: number = 0
  let isRefreshing = false;
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      isRefreshing = true;
      if (error.status === HttpStatusCode.Unauthorized) {
        _auth.logOut();
        _route.navigateByUrl('login')


        // const tokenRefresh = _auth.getRefreshToken();
        // let jwtRefresh = req.clone({
        //   setHeaders: { Authorization: 'Bearer ' + tokenRefresh }
        // })
        // console.log('entro refresh')


        // return _userServ.refreshToken().pipe(
        //   switchMap((res: any) => {

        //     console.log('**** se jkjk**')
        //     _auth.SetToken(res.result)
        //     console.log('**** se refresco el token**')
        //     isRefreshing = false;
        //     return next(jwtRefresh)
        //   }),
        //   catchError((err) => {
        //     isRefreshing = false;
        //     _route.navigateByUrl('login')
        //     return throwError(err);
        //   })


        // ); // termina


      }

      _route.navigateByUrl('login')
      return throwError(() => error)
    })
  );
};
