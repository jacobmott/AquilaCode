import { Injectable } from "@angular/core";
import { Socket, SocketIoConfig } from "ngx-socket-io";
// import { SocketAquila } from "../../socket-aquila";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../../shared/data-access/authentication.service";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  socket: Socket;

  constructor(private authenticationService: AuthenticationService) {
    const config: SocketIoConfig = {
      url: environment.socketUrl,
      options: {
        path: environment.socketUrlPath,
        query: {
          token: this.authenticationService.getToken(),
        },
        // auth: {
        //   token: "test",
        // },
        // extraHeaders: { Authorization: `Bearer test` },
      },
    };
    this.socket = new Socket(config);
  }

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
