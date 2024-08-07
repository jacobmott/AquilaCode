import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-top-nav-svg",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./top-nav-svg.component.svg",
  styleUrl: "./top-nav-svg.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class TopNavSvgComponent {
  fillColor = "rgb(255, 0, 0)";

  selectedXPosition = 0;
  initial = true;

  onMouseMove(event: MouseEvent) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
    // console.dir(event);
    this.selectedXPosition = event.offsetX - 56;
    // console.dir(this.selectedXPosition);
  }

  getTransform() {
    if (this.initial) {
      this.initial = false;
      return `translate(0)`;
    }
    return `translate(${this.selectedXPosition})`;
  }
}
