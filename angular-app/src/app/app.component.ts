import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { LoginLogoutComponent } from "./shared/login-logout/login-logout.component";

@Component({
  standalone: true,
  imports: [RouterModule, SidebarComponent, LoginLogoutComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
