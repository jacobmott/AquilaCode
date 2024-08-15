import { Component, ViewEncapsulation, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopNavSvgComponent } from "../../shared/ui/top-nav-svg.component";
import { LoginButtonComponent } from "../../shared/ui/session/login-button.component";
import { LogoutButtonComponent } from "../../shared/ui/session/logout-button.component";
import { AuthService } from "@auth0/auth0-angular";
import { ApiModule } from "aquilacode-api";
import { DefaultService } from "aquilacode-api";

@Component({
  selector: "app-aquila-hometop",
  standalone: true,
  imports: [
    CommonModule,
    TopNavSvgComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    ApiModule,
  ],
  templateUrl: "./hometop.component.html",
  styleUrl: "./hometop.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class HometopComponent implements OnInit {
  constructor(private aquilacode: DefaultService) {}
  scrollToTop = 0;
  private auth = inject(AuthService);
  isAuthenticated$ = this.auth.isAuthenticated$;
  profileJson = "";
  user$ = this.auth.user$;

  ngOnInit(): void {
    this.scrollToTop = 0;
    setInterval(() => {
      this.scrollToTop += 1;
      if (this.scrollToTop >= 175) {
        this.scrollToTop = 0;
      }
      // console.log(this.scrollToTop);
    }, 200);

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

    // this.auth.isAuthenticated$.subscribe((value: boolean) => {
    //   console.log("Authd:", value);
    // });
  }
}
