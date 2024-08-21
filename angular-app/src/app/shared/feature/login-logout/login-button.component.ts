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
  templateUrl: "./login-button.component.svg",
  styleUrl: "./login-button.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginButtonComponent implements AfterViewInit, OnInit {
  private auth = inject(AuthService);
  sSBSFTextColor = "#8E37E6";
  @ViewChild("mySvg", { read: ElementRef }) public svgElement!: ElementRef;
  svgRef: SVGSVGElement;

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
    console.log("ngAfterViewInit");
  }

  ngOnInit() {
    // const svg = this.svgElement.nativeElement;
    // if (svg !== null) {
    //   this.svgRef = <SVGSVGElement>svg;
    // }
    console.log("ngAfterViewInit");
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
    this.handleLogin();
  }
}
