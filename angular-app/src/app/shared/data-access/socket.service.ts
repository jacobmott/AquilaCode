import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string) {
    this.socket.emit("newMessage", msg);
  }
  getConnectedMessage() {
    return this.socket
      .fromEvent("connected")
      .pipe(map((data: any) => data.clientId));
  }

  getDisconnectedMessage() {
    return this.socket
      .fromEvent("disconnected")
      .pipe(map((data: any) => data.clientId));
  }

  getBroadcastMessage() {
    return this.socket
      .fromEvent("broadcastmessage")
      .pipe(map((data: any) => data));
  }
}
