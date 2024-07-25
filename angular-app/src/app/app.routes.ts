import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ShipsComponent } from "./ships/ships.component";

export const routes: Route[] = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "ships",
    component: ShipsComponent,
  },
  //   {
  //     path: "ships",
  //     component: NxWelcomeComponent,
  //     pathMatch: "full",
  //   },
];
