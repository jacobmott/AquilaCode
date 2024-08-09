import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-sidebar-button-ships",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./sidebar-button-ships.component.svg",
  styleUrl: "./sidebar-button-ships.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class SidebarButtonShipsComponent {
  sSBSFGradientColor = "none";
  sSBSFLightReflection = "none";
  sSBSFTextColor = "#ebebf580";

  onPointerEnter(event: MouseEvent) {
    this.sSBSFGradientColor = "url(#paint0_radial_11_402)";
    this.sSBSFLightReflection = "url(#paint2_linear_11_402)";
    this.sSBSFTextColor = "#FFFFFF";
  }
  onPointerLeave(event: MouseEvent) {
    this.sSBSFGradientColor = "none";
    this.sSBSFLightReflection = "none";
    this.sSBSFTextColor = "#ebebf580";
  }
}
