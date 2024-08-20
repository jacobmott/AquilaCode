import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    path: "",
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
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/feature/profile-shell/profile-shell-routes").then(
        (routes) => routes.routes,
      ),
  },
];
