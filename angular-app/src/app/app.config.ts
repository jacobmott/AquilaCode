import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";

import {
  RouteReuseStrategy,
  provideRouter,
  RouterModule,
  Routes,
} from "@angular/router";
import {
  BaseRouteReuseStrategy,
  DefaultRouteReuseStrategy,
} from "./route-strategy/base-route-reuse-strategy.service";
import { CustomRouteReuseStrategy } from "./route-strategy/custom-route-reuse-strategy.service";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { BASE_PATH } from "aquilacode-api";
import { environment } from "../environments/environment";
import { provideAuth0 } from "@auth0/auth0-angular";
// Import the injector module and the HTTP client module from Angular
// Import the HTTP interceptor from the Auth0 Angular SDK
import { authHttpInterceptorFn } from "@auth0/auth0-angular";
import { TopNavLightSliderService } from "./shared/data-access/top-nav-light-slider.service";
import { SocketModule } from "./socket.module";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    { provide: BASE_PATH, useValue: environment.basepath },
    provideAuth0(environment.auth),
    TopNavLightSliderService,
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
    importProvidersFrom(SocketModule),
  ],
};
