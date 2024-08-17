import { Routes } from "@angular/router";
import { ShipsComponent } from "../ui/ships.component";
import { AuthGuard } from "@auth0/auth0-angular";

export const shipsRoutes: Routes = [
  {
    path: "",
    component: ShipsComponent,
    canActivate: [AuthGuard],
  },
];
