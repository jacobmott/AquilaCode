import {
  Component,
  ViewEncapsulation,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-aquila-logout-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./logout-button.component.html",
  styleUrl: "./logout-button.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class LogoutButtonComponent implements AfterViewInit {
  private auth = inject(AuthService);
  private doc = inject(DOCUMENT);
  sSBSFTextColor = "#8E37E6";
  @ViewChild("mySvg") svgElement!: ElementRef;
  svgRef: SVGSVGElement;

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: environment.url,
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
    // this.sSBSFGradientColor = "url(#paint0_radial_11_402)";
    // this.sSBSFLightReflection = "url(#paint2_linear_11_402)";
    this.sSBSFTextColor = "#FF00EC";
  }
  onPointerLeave(event: MouseEvent) {
    // this.sSBSFGradientColor = "none";
    // this.sSBSFLightReflection = "none";
    this.sSBSFTextColor = "#8E37E6";
  }
  onPointerDown(event: MouseEvent) {
    this.handleLogout();
  }
}
