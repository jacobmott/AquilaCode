import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { BASE_PATH } from "aquilacode-api";
import { environment } from "../environments/environment";
import { provideAuth0 } from "@auth0/auth0-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: BASE_PATH, useValue: environment.basepath },
    provideAuth0(environment.auth),
  ],
};
