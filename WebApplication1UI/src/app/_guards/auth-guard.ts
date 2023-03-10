import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = () => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
 
  //get the jwt token which are present in the local storage
  const token = localStorage.getItem("jwt");
  // if()
  // const expDate = jwtHelper.getTokenExpirationDate(token);

  //Check if the token is expired or not and if token is expired then redirect to login page and return false
  if (token && !jwtHelper.isTokenExpired(token)){
    // if( > new Date())
    return true;
  }

  // if (token && jwtHelper.decodeToken(token).StayIn == 'true') {
  //   alert(5)
  // }
  
  router.navigate(["/"]);
  return false;
}
