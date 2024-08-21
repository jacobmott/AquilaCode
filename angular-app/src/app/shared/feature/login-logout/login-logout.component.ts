import { Component, ViewEncapsulation, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginButtonComponent } from "./login-button.component";
import { LogoutButtonComponent } from "./logout-button.component";
import { AuthService } from "@auth0/auth0-angular";
import { ApiModule } from "aquilacode-api";
import { DefaultService } from "aquilacode-api";

@Component({
  selector: "app-aquila-login-logout",
  standalone: true,
  imports: [
    CommonModule,
    LoginButtonComponent,
    LogoutButtonComponent,
    ApiModule,
  ],
  templateUrl: "./login-logout.component.html",
  styleUrl: "./login-logout.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginLogoutComponent implements OnInit {
  isAuthenticated = false;
  constructor(
    private aquilacode: DefaultService,
    private auth: AuthService,
  ) {
    this.auth.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      },
      error: (msg) => {
        // console.log("error");
      },
    });
  }

  // private auth = inject(AuthService);
  // isAuthenticatedObs$ = this.auth.isAuthenticated$;
  profileJson = "";
  // user$ = this.auth.user$;

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.stringify(profile, null, 2);
      console.dir(profile);
      console.log(this.profileJson);
      if (profile === null || profile === undefined) {
        return;
      }
      const idInfo = profile.sub;
      this.aquilacode
        .usersCreate({ connectionInfo: idInfo })
        .subscribe((data) => {
          console.log(data);
        });
    });
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
