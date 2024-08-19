import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopNavSvgComponent } from "../../shared/top-nav-light-slider/ui/top-nav-svg.component";
import { ShipTypesComponent } from "./ship-types.component";

@Component({
  selector: "app-aquila-shipstop",
  standalone: true,
  imports: [CommonModule, TopNavSvgComponent, ShipTypesComponent],
  templateUrl: "./shipstop.component.html",
  styleUrl: "./shipstop.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class ShipstopComponent {
  scrollToTop = 0;
}
