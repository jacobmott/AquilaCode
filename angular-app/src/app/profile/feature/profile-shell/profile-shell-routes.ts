import { Route } from "@angular/router";
import { ProfileComponent } from "../profile.component";
import { AuthGuard } from "@auth0/auth0-angular";

export const routes: Route[] = [
  { path: "", component: ProfileComponent, canActivate: [AuthGuard] },
];
