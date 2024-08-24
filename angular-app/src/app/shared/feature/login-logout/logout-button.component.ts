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
import { Subscription } from "rxjs";

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
  sSBSFTextColor = "#5900B3";
  @ViewChild("mySvg", { read: ElementRef }) public svgElement!: ElementRef;
  svgRef: SVGSVGElement;

  startingClasses =
    "absolute h-full w-full transition-all duration-300 ease-in";
  classes = this.startingClasses;
  animateClasses =
    "absolute h-96 w-96 -translate-x-full transition-all duration-300 ease-in";

  handleLogout(): Subscription {
    return this.auth
      .logout({
        logoutParams: {
          returnTo: environment.url,
        },
      })
      .pipe()
      .subscribe((what) => {
        this.classes = this.startingClasses;
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
    this.handleLogout();
  }

  getClasses(): string {
    return this.classes;
  }
}
