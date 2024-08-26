import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

import { AuthenticationService } from "../data-access/authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    console.log("AuthGuard constructor");
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log("AuthGuard CanActivate");
    if (this.authenticationService.isAuthenticated_b()) {
      console.log("AuthGuard CanActivate: Authenticated: Routing to: " + "");
      // this.router.navigate([""], {
      //   skipLocationChange: true,
      //   onSameUrlNavigation: "reload",
      // });
    } else {
      console.log(
        "AuthGuard CanActivate: Not Authenticated: Routing to: " + "home",
      );
      // this.router.navigate(["home"], { skipLocationChange: true });
    }
    return this.authenticationService.isAuthenticated();
  }
}
