import { Injectable, inject } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  isAuthenticated = false;

  constructor() {
    this.auth.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      },
      error: (msg) => {
        console.log("error");
      },
    });
  }
  private auth = inject(AuthService);

  canActivate(): boolean {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.auth.loginWithPopup({
        authorizationParams: {
          redirect_uri: environment.url,
        },
      });
      return false;
    }
  }
}
