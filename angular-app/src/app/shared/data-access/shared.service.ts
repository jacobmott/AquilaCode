import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { EventBus } from "../../../game/EventBus";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  chatFocused: boolean = false;
  sharedisChatFocusedBS: BehaviorSubject<boolean>;
  scrolledData: { identifier: string; data: string }[] = [];
  dataPoint: any;

  constructor() {
    this.sharedisChatFocusedBS = new BehaviorSubject<boolean>(false);
    this.dataPoint = { dataPoint1: "no data" };
    this.scrolledData = [{ identifier: "Init", data: "Init" }];
    EventBus.on("add-scrolled-data", (scene: Phaser.Scene, data) => {
      this.addToScrolledData(data);
    });
    EventBus.on("update-data-point", (scene: Phaser.Scene, data) => {
      this.setDataPoint(data);
    });
  }

  public setDataPoint(dataPoint: string) {
    this.dataPoint.dataPoint1 = dataPoint;
  }

  public addToScrolledData(data: { identifier: string; data: string }) {
    this.scrolledData.push(data);
  }

  public getChatFocusedBS(): Observable<boolean> {
    return this.sharedisChatFocusedBS.asObservable();
  }

  public setChatFocusedBS(focused: boolean) {
    this.sharedisChatFocusedBS.next(focused);
  }
}
