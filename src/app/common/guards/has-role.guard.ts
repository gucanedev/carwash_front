import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../../service/auth-user.service';

 
// export const hasRoleGuard: CanActivateFn = (route, state) => {
//   return true;
// };


export const hasRoleGuard = (roles:string): CanActivateFn =>{


return (route, state) => {
    const authService = inject(AuthUserService);

    const _router = inject(Router);
var rolesg= authService.getRoles();


    if (rolesg && rolesg.includes(roles)) {
       console.log('Los encontro');
      return true;
    } else {
      console.log('No encontro');
       _router.navigate(['/no-autorizado']);
      return false;
    }
  };
    
// "Admin,Supervisor"
    

}