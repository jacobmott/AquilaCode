import { Component, ViewEncapsulation, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopNavSvgComponent } from "../../shared/ui/top-nav-svg.component";
import { LoginButtonComponent } from "../../shared/ui/session/login-button.component";
import { LogoutButtonComponent } from "../../shared/ui/session/logout-button.component";
import { AuthService } from "@auth0/auth0-angular";
import { map } from "rxjs/operators";

@Component({
  selector: "app-aquila-hometop",
  standalone: true,
  imports: [
    CommonModule,
    TopNavSvgComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
  ],
  templateUrl: "./hometop.component.html",
  styleUrl: "./hometop.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class HometopComponent implements OnInit {
  scrollToTop = 0;
  private auth = inject(AuthService);
  isAuthenticated$ = this.auth.isAuthenticated$;

  ngOnInit(): void {
    this.scrollToTop = 0;
    setInterval(() => {
      this.scrollToTop += 1;
      if (this.scrollToTop >= 175) {
        this.scrollToTop = 0;
      }
      // console.log(this.scrollToTop);
    }, 200);
  }
}
