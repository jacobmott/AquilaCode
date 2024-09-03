import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  chatFocused: boolean = false;
  sharedisChatFocusedBS: BehaviorSubject<boolean>;

  constructor() {
    this.sharedisChatFocusedBS = new BehaviorSubject<boolean>(false);
  }

  public getChatFocusedBS(): Observable<boolean> {
    return this.sharedisChatFocusedBS.asObservable();
  }

  public setChatFocusedBS(focused: boolean) {
    this.sharedisChatFocusedBS.next(focused);
  }
}
