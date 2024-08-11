import { Component, ViewEncapsulation, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-aquila-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProfileComponent implements OnInit {
  private auth = inject(AuthService);
  profileJson = "";
  user$ = this.auth.user$;

  ngOnInit() {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.stringify(profile, null, 2);
      console.log(this.profileJson);
    });
  }
}
