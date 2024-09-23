import { Route } from "@angular/router";
// import { AuthGuard } from "@auth0/auth0-angular";
// import { CanMatchGuard } from "./shared/util/match.guard";
import { AuthGuard } from "./shared/util/auth.guard";

export const routes: Route[] = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  }, // Redirect to '/home' when the path is empty
  {
    path: "play",
    loadChildren: () =>
      import("./play/feature/play-shell/play-shell-routes").then(
        (routes) => routes.routes,
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/feature/home-shell/home-shell-routes").then(
        (routes) => routes.routes,
      ),
  },
  // Add your another routes using this syntax.
  {
    path: "ships",
    loadChildren: () =>
      import("./ships/feature/ship-shell/ship-shell-routes").then(
        (routes) => routes.routes,
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/feature/profile-shell/profile-shell-routes").then(
        (routes) => routes.routes,
      ),
  },
];
