import { Component, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-aquila-login-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./login-button.component.html",
  styleUrl: "./login-button.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginButtonComponent {
  private auth = inject(AuthService);

  handleLogin(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: environment.url,
      },
    });
  }
}
