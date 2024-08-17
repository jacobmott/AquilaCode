import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SidebarComponent } from "./shared/ui/sidebar/sidebar.component";
import { HometopComponent } from "./home/ui/hometop.component";

@Component({
  standalone: true,
  imports: [RouterModule, SidebarComponent, HometopComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
