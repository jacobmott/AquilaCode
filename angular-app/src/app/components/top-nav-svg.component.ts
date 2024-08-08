import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-top-nav-svg",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./top-nav-svg.component.svg",
  styleUrl: "./top-nav-svg.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class TopNavSvgComponent implements AfterViewInit {
  @ViewChild("mySvg") svgElement!: ElementRef;
  svgRef: SVGSVGElement;

  distanceToCenterOfBlurOnSvg = 53;
  currentXPosition = 0;

  xBoundsLeft = -32;
  xBoundsRight = 1164;

  onPointerMove(event: MouseEvent) {
    let point = new DOMPoint(0, 0);
    const { clientX, clientY } = event || { clientX: 0, clientY: 0 };
    point.x = clientX;
    point.y = clientY;
    point = point.matrixTransform(this.svgRef.getScreenCTM()?.inverse());
    // console.dir(point.x);

    const position = point.x - this.distanceToCenterOfBlurOnSvg;
    if (position < this.xBoundsLeft || position > this.xBoundsRight) {
      return;
    }
    this.currentXPosition = position;
  }

  getTransform() {
    return `translate(${this.currentXPosition})`;
  }

  ngAfterViewInit() {
    const svg = this.svgElement.nativeElement;
    if (svg !== null) {
      this.svgRef = <SVGSVGElement>svg;
    }
  }
}
