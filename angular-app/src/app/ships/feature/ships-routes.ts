import { Routes } from "@angular/router";
import { ShipsComponent } from "../ui/ships.component";
import { AuthGuard } from "@auth0/auth0-angular";
import { ShipstopComponent } from "../ui/shipstop.component";

export const shipsRoutes: Routes = [
  {
    path: "",
    component: ShipsComponent,
    canActivate: [AuthGuard],
  },
  { path: "", component: ShipstopComponent, outlet: "top" },
];
