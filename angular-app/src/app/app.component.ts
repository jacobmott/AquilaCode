import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SidebarComponent } from "./shared/feature/sidebar/sidebar.component";
import { LoginLogoutComponent } from "./shared/feature/login-logout/login-logout.component";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  imports: [RouterModule, SidebarComponent, LoginLogoutComponent, CommonModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
