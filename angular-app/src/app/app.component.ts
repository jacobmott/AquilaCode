import { Component, AfterViewInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SidebarComponent } from "./shared/feature/sidebar/sidebar.component";
import { LoginLogoutComponent } from "./shared/feature/login-logout/login-logout.component";
import { CommonModule } from "@angular/common";
import { AuthenticationService } from "./shared/data-access/authentication.service";
import { EventBus } from "../game/EventBus";

@Component({
  standalone: true,
  imports: [RouterModule, SidebarComponent, LoginLogoutComponent, CommonModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements AfterViewInit {
  isAuthenticated = false;
  isPhaserSceneReady = false;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService
      .isAuthenticated()
      .subscribe((isAuthenticated) => {
        console.log("AppComponent: isAuthenticated: " + isAuthenticated);
        this.isAuthenticated = isAuthenticated;
      });
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit AppComponent...");
    EventBus.on("current-scene-ready", (scene: Phaser.Scene) => {
      this.isPhaserSceneReady = true;
    });
  }

  isLoggedInAndPlaying() {
    return this.isAuthenticated && this.isPhaserSceneReady;
  }
}
