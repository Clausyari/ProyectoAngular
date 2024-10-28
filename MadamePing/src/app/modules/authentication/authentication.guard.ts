import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './_service/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthenticationService).isUserLoggedIn();
  console.log(isLoggedIn);
  
  if (!isLoggedIn) {
    return inject(Router).navigate(['/login'], { queryParams: { returnUrl: state.url } });
  }
  return true;
};