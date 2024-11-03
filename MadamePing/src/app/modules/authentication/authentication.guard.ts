import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './_service/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state: RouterStateSnapshot) => {
  const isLoggedIn = inject(AuthenticationService).isUserLoggedIn();
  console.log("Estado de inicio de sesión:", isLoggedIn);
  
  if (!isLoggedIn) {
    return inject(Router).navigate(['/login'], { queryParams: { returnUrl: state.url } });
  }
  return true;
};