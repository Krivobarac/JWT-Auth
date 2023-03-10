import { inject } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router"
import { JwtHelperService } from "@auth0/angular-jwt"

export const pageRestrictionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const jwtHelper = inject(JwtHelperService)

    console.log(route)
    console.log(jwtHelper.getTokenExpirationDate())
    console.log(jwtHelper.decodeToken());
    console.log(new Date(jwtHelper.decodeToken().exp));

    return route.data[0]?.roles?.every((role: string) => jwtHelper.decodeToken().Roles.includes(role));
}