import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    path: "",
    loadChildren: () =>
      import("./home/feature/home-routes").then((routes) => routes.homeRoutes),
  },
  // Add your another routes using this syntax.
  {
    path: "ship",
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
