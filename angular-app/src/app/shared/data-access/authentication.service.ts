import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { Observable, of, Observer, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  isAuthenticated_ = false;
  jwtAccessToken = "";

  profileJson: string = "";
  profileJson$: Observable<string> = of("");
  profile: any = {};
  profile$: Observable<any> = of(null);

  isAuthenticatedBs = new BehaviorSubject(false);
  isAuthenticated$ = this.isAuthenticatedBs.asObservable();

  // private auth = inject(AuthService);
  // isAuthenticatedObs$ = this.auth.isAuthenticated$;
  // user$ = this.auth.user$;

  constructor(private auth: AuthService) {
    this.auth.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated_ = isAuthenticated;
        this.isAuthenticatedBs.next(isAuthenticated);
        if (!isAuthenticated) {
          console.log("AuthenticationService: Not authenticated");
        }
        if (isAuthenticated) {
          console.log("AuthenticationService: Authenticated");
        }
      },
      error: (msg) => {
        console.log("AuthenticationService: Error: " + msg);
      },
      complete: () => {
        console.log("AuthenticationService: Complete");
      },
    });
    // setInterval(() => {
    //   this.isAuthenticated_$ = of(false);
    //   console.log("AuthenticationService: Timeout");
    // }, 1000);

    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
      this.profileJson = JSON.stringify(profile, null, 2);
      console.dir(profile);
      console.log(this.profileJson);
      this.profileJson$ = of(this.profileJson);
      this.profile$ = of(this.profile);
      if (profile === null || profile === undefined) {
        return;
      }
    });

    this.auth.getAccessTokenSilently().subscribe((data) => {
      this.jwtAccessToken = data;
      // console.log("GetAccessTokenSilently: " + data);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  isAuthenticated_b(): boolean {
    return this.isAuthenticated_;
  }

  getProfileJson(): Observable<string> {
    return this.profileJson$;
  }

  getProfile(): Observable<any> {
    return this.profile$;
  }

  getToken(): string {
    console.log("getToken called: " + this.jwtAccessToken);
    return this.jwtAccessToken;
  }
}
