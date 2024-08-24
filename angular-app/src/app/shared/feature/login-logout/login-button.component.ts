import {
  Component,
  ViewEncapsulation,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
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
    "absolute h-full w-full transition-all duration-300 ease-in";
  classes = this.startingClasses;
  animateClasses =
    "absolute h-96 w-96 -translate-x-full transition-all duration-300 ease-in";

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
