import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-aquila-maincontent",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./maincontent.component.html",
  styleUrl: "./maincontent.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class MaincontentComponent {}
