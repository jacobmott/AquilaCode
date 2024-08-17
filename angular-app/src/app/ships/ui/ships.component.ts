import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OnInit } from "@angular/core";
import { ApiModule } from "aquilacode-api";
import { DefaultService } from "aquilacode-api";

@Component({
  selector: "app-aquila-ships",
  standalone: true,
  imports: [CommonModule, ApiModule],
  templateUrl: "./ships.component.html",
  styleUrl: "./ships.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class ShipsComponent implements OnInit {
  ships: any;
  ships2 = "";

  constructor(private aquilacode: DefaultService) {}

  ngOnInit() {
    this.aquilacode.shipsFindAll().subscribe((ships) => {
      this.ships = ships;
      this.ships2 = JSON.stringify(this.ships);
      console.dir(this.ships);
    });
  }
}
