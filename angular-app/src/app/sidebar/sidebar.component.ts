import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-aquila-sidebar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class SidebarComponent {
  aClass =
    "z-60 col-span-2 col-start-1 col-end-4 row-start-1 h-4 w-4 rounded-full sm:h-4 sm:w-4 md:h-6 md:w-6 lg:h-10 lg:w-10 xl:h-12 xl:w-12";
  func() {
    return this.aClass;
  }

  onPointerOver(event: MouseEvent) {
    //console.log("onPointerMove");
    this.aClass =
      "z-60 bg-aquilapink-600 col-span-2 col-start-1 col-end-4 row-start-1 h-4 w-4 rounded-full sm:h-4 sm:w-4 md:h-6 md:w-6 lg:h-10 lg:w-10 xl:h-12 xl:w-12";
  }
  onPointerOut(event: MouseEvent) {
    //console.log("onPointerMove");
    this.aClass =
      "z-60 col-span-2 col-start-1 col-end-4 row-start-1 h-4 w-4 rounded-full sm:h-4 sm:w-4 md:h-6 md:w-6 lg:h-10 lg:w-10 xl:h-12 xl:w-12";
  }
}
