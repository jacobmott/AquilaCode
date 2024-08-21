import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OnInit } from "@angular/core";
import { ApiModule } from "aquilacode-api";
import { DefaultService } from "aquilacode-api";
import { ShipCardComponent } from "../../ui/ship-card/ship-card.component";

@Component({
  selector: "app-aquila-ship-list",
  standalone: true,
  imports: [CommonModule, ApiModule, ShipCardComponent],
  templateUrl: "./ship-list.component.html",
  styleUrl: "./ship-list.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class ShipListComponent implements OnInit {
  ships: any[];
  ships2 = "";

  constructor(private aquilacode: DefaultService) {
    this.ships = [];
  }

  ngOnInit() {
    this.aquilacode.shipsFindAll().subscribe((ships) => {
      this.ships = ships;
      const moreships: any[] = this.ships.concat(ships);
      this.ships = moreships.concat(ships);
      this.ships2 = JSON.stringify(this.ships);
      console.dir(this.ships);
    });
  }
}
