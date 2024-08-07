import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { TopNavSvgComponent } from "../components/top-nav-svg.component";

@Component({
  selector: "app-aquila-maincontent",
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopNavSvgComponent],
  templateUrl: "./maincontent.component.html",
  styleUrl: "./maincontent.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class MaincontentComponent {}
