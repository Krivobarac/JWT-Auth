import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FingerprintjsProAngularService } from '@fingerprintjs/fingerprintjs-pro-angular';

export const authGuard: CanActivateFn = async () => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const fingerprintjsProAngularService = inject(FingerprintjsProAngularService);

  const data = await fingerprintjsProAngularService.getVisitorData();
  const visitorId = data.visitorId;
 
  //get the jwt token which are present in the local storage
  const token = localStorage.getItem("jwt");
  // if()
  // const expDate = jwtHelper.getTokenExpirationDate(token);

  //Check if the token is expired or not and if token is expired then redirect to login page and return false

  console.log('++++++++++++++++++++++++++++')
  console.log(visitorId)
  console.log(jwtHelper.decodeToken(token!).Fingerprint)
  console.log('++++++++++++++++++++++++++++')
  if (token && !jwtHelper.isTokenExpired(token) && jwtHelper.decodeToken(token).Fingerprint === visitorId ){
    // if( > new Date())
    return true;
  }

  // if (token && jwtHelper.decodeToken(token).StayIn == 'true') {
  //   alert(5)
  // }
  
  router.navigate(["/login"]);
  return false;
}
