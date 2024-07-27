import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ShipsComponent } from "./ships/ships.component";
import { HometopComponent } from "./home/hometop.component";

export const routes: Route[] = [
  {
    // outlet: 'primary',
    path: "",
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            outlet: "Topbar",
            component: HometopComponent,
          },
          {
            path: "",
            outlet: "Maincontainer",
            component: HomeComponent,
          },
        ],
      },
      {
        path: "",
        children: [
          {
            path: "",
            outlet: "Topbar",
            component: HometopComponent,
          },
          {
            path: "",
            outlet: "Maincontainer",
            component: HomeComponent,
          },
        ],
      },
    ],
  },
];
