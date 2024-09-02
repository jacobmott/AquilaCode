import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";
import { Socket } from "socket.io";
import { SocketService } from "./socket.service";
import { JwtAuthGuardWS } from "../auth/jwt-auth-ws.guard";
import config from "../../config/keys";

// @WebSocketGateway({ cors: { origin: "*" } })
@WebSocketGateway({
  // cors: {
  //   origin: "http://localhost:4200",
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   allowedHeaders: ["Cookie"],
  //   credentials: true,
  // },
  cors: true,
})
@UseGuards(JwtAuthGuardWS)
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
