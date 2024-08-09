import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopNavSvgComponent } from "../components/top-nav-svg.component";

@Component({
  selector: "app-aquila-hometop",
  standalone: true,
  imports: [CommonModule, TopNavSvgComponent],
  templateUrl: "./hometop.component.html",
  styleUrl: "./hometop.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class HometopComponent implements OnInit {
  scrollToTop = 0;

  ngOnInit(): void {
    this.scrollToTop = 0;
    setInterval(() => {
      this.scrollToTop += 1;
      if (this.scrollToTop >= 175) {
        this.scrollToTop = 0;
      }
      // console.log(this.scrollToTop);
    }, 200);
  }
}
