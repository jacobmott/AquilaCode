import { Component, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-logout-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./logout-button.component.html",
  styleUrl: "./logout-button.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class LogoutButtonComponent {
  private auth = inject(AuthService);
  private doc = inject(DOCUMENT);

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: environment.url,
      },
    });
  }
}
