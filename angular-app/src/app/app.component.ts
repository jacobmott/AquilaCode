import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
//import { AquilacodeApiService } from "./aquilacode-api.service";
import { OnInit } from "@angular/core";
import { ApiModule } from "aquilacode-api";
import { DefaultService } from "aquilacode-api";
import { HttpClient } from "@angular/common/http";
import { SidebarComponent } from "./shared/ui/sidebar/sidebar.component";
import { TopNavSvgComponent } from "./shared/ui/top-nav-svg.component";
import { HometopComponent } from "./home/ui/hometop.component";

@Component({
  standalone: true,
  imports: [
    RouterModule,
    ApiModule,
    SidebarComponent,
    TopNavSvgComponent,
    HometopComponent,
  ],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  ships: any;
  ships2 = "";

  constructor(
    private aquilacode: DefaultService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.aquilacode.shipsFindAll().subscribe((ships) => {
      this.ships = ships;
      this.ships2 = JSON.stringify(this.ships);
      console.dir(this.ships);
    });
  }
}
