import { Injectable, inject } from "@angular/core";
import { CanMatch } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CanMatchGuard implements CanMatch {
  isAuthenticated = false;

  constructor(private router: Router) {
    // this.auth.isAuthenticated$.subscribe({
    //   next: (isAuthenticated) => {
    //     this.isAuthenticated = isAuthenticated;
    //   },
    //   error: (msg) => {
    //     console.log("error");
    //   },
    // });
  }
  private auth = inject(AuthService);

  canMatch(what: any): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated$;

    // if (this.isAuthenticated) {
    //   return false;
    // } else {
    // not logged in so redirect to login page with the return url
    // this.router.navigate([""], { skipLocationChange: true });
    // return true;
    // this.auth.loginWithPopup({
    //   authorizationParams: {
    //     redirect_uri: environment.url,
    //   },
    // });
    // return false;
    // }
  }
}
