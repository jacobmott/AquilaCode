import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { SocketService } from "./socket.service";

@WebSocketGateway({ cors: { origin: "*" } })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Socket;

  constructor(private readonly socketService: SocketService) {}
  //   constructor() {}

  handleConnection(client: Socket): void {
    this.socketService.setServer(this.server);
    this.socketService.handleConnection(client);
    // setInterval(() => {
    //   console.log("testiing logs");
    // }, 1000);
  }

  handleDisconnect(client: Socket): void {
    this.socketService.handleDisconnect(client);
  }

  @SubscribeMessage("newMessage")
  handleNewMessage(client: Socket, message: any): void {
    this.socketService.handleNewMessage(client, message);
    // this.server.emit("message", message);
  }

  // Implement other Socket.IO event handlers and message handlers
}
