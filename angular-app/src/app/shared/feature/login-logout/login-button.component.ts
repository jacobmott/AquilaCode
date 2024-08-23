import {
  Component,
  ViewEncapsulation,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-aquila-login-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./login-button.component.html",
  styleUrl: "./login-button.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})

// pointer-events: none;
export class LoginButtonComponent implements AfterViewInit {
  private auth = inject(AuthService);
  sSBSFTextColor = "#8E37E6";
  @ViewChild("mySvg", { read: ElementRef }) public svgElement!: ElementRef;
  svgRef: SVGSVGElement;

  startingClasses =
    "z-49 h-full w-full absolute transition-all duration-500 ease-in";
  classes = this.startingClasses;
  animateClasses =
    "z-49 h-96 w-96 absolute transition-all duration-500 ease-in -translate-x-full";

  handleLogin(): void {
    this.auth.loginWithPopup({
      authorizationParams: {
        redirect_uri: environment.url,
      },
    });
  }
  ngAfterViewInit() {
    const svg = this.svgElement.nativeElement;
    if (svg !== null) {
      this.svgRef = <SVGSVGElement>svg;
    }
  }

  onPointerEnter(event: MouseEvent) {
    this.sSBSFTextColor = "#7F00FF";
    this.classes = this.animateClasses;
  }
  onPointerLeave(event: MouseEvent) {
    this.sSBSFTextColor = "#8E37E6";
    this.classes = this.startingClasses;
  }
  onPointerDown(event: MouseEvent) {
    this.classes = this.startingClasses;
    this.handleLogin();
  }

  getClasses(): string {
    return this.classes;
  }
}
