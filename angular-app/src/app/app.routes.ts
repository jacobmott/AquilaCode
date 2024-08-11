import { Route } from "@angular/router";
import { HomeComponent } from "./home/ui/home.component";

export const routes: Route[] = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    // outlet: 'primary',
    path: "home",
    component: HomeComponent,
  },
  // Add your another routes using this syntax.
  {
    path: "ships",
    loadChildren: () =>
      import("./ships/feature/ships-routes").then(
        (routes) => routes.shipsRoutes,
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/feature/profile-routes").then(
        (routes) => routes.profileRoutes,
      ),
  },
];
