import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-aquila-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent {
  onTimeUpdate(event: Event): void {
    const videoElement = event.target as HTMLVideoElement;
    const currentTime: number = videoElement.currentTime;
    console.log(currentTime);
  }
}
