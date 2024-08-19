import { Route } from "@angular/router";
import { HomeComponent } from "../ui/home.component";
import { HometopComponent } from "../ui/hometop.component";
// import { AuthGuard } from "@auth0/auth0-angular";

export const homeRoutes: Route[] = [
  // { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "", component: HomeComponent },
  { path: "", component: HometopComponent, outlet: "top" },
];
