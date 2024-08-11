import { Route } from "@angular/router";
import { ProfileComponent } from "../ui/profile.component";
import { AuthGuard } from "@auth0/auth0-angular";

export const profileRoutes: Route[] = [
  { path: "", component: ProfileComponent, canActivate: [AuthGuard] },
];
