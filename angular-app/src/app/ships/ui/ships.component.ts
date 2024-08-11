import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-aquila-ships",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ships.component.html",
  styleUrl: "./ships.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class ShipsComponent {}
