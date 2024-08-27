import { Component, ViewEncapsulation, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginButtonComponent } from "./login-button.component";
import { LogoutButtonComponent } from "./logout-button.component";
import { AuthenticationService } from "../../data-access/authentication.service";
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
  arrowFillColor = "#8E37E6";

  constructor(
    private aquilacode: DefaultService,
    private authenticationService: AuthenticationService,
  ) {
    this.isAuthenticated = this.authenticationService.isAuthenticated_b();
    // this.authenticationService.isAuthenticated().subscribe({
    //   next: (isAuthenticated) => {
    //     console.log(
    //       "LoginLogoutComponent: isAuthenticated: " + isAuthenticated,
    //     );
    //     this.isAuthenticated = isAuthenticated;
    //   },
    //   error: (msg) => {
    //     console.log("LoginLogoutComponent: Error: " + msg);
    //   },
    // });
    this.authenticationService
      .isAuthenticated()
      .subscribe((isAuthenticated) => {
        console.log(
          "LoginLogoutComponent: isAuthenticated: " + isAuthenticated,
        );
        this.isAuthenticated = isAuthenticated;
      });

    this.authenticationService.getProfile().subscribe((profile) => {
      if (profile === null) {
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

  ngOnInit(): void {
    const chill = "";
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
