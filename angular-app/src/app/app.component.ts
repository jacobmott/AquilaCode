import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxWelcomeComponent } from "./nx-welcome.component";
//import { AquilacodeApiService } from "./aquilacode-api.service";
import { OnInit } from "@angular/core";
import { ApiModule } from "aquilacode-api";
import { DefaultService } from "aquilacode-api";
import { HttpClient } from "@angular/common/http";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MaincontentComponent } from "./maincontent/maincontent.component";

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    ApiModule,
    SidebarComponent,
    MaincontentComponent,
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
    this.aquilacode.findAll().subscribe((ships) => {
      this.ships = ships;
      this.ships2 = JSON.stringify(this.ships);
      console.dir(this.ships);
    });
  }
}
