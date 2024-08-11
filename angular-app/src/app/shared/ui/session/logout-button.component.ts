import { Component, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";

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
        returnTo: this.doc.location.origin,
      },
    });
  }
}
