import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  private server: Socket;

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);
    console.log("Client Connected:", clientId);
    socket.broadcast.emit("connected", { clientId: clientId });
    // Handle other events and messages from the client
  }

  handleDisconnect(client: Socket): void {
    const clientId = client.id;
    this.connectedClients.delete(clientId);
    console.log("Client Disconnected:", clientId);
    client.broadcast.emit("disconnected", { clientId: clientId });
  }

  handleNewMessage(client: Socket, message: string): void {
    console.log("Message received:", message);
    const clientId = client.id;
    // this.server.emit("reply", "(BROADCAST) I see you! " + clientId);
    //reply this this one client
    // client.emit("reply", "(CLIENT) I see you! " + clientId);

    //If you want to broadcast to everyone except this client
    client.broadcast.emit("broadcastmessage", {
      clientId: clientId,
      message: message,
    });
  }

  setServer(server: Socket): void {
    this.server = server;
  }

  // Add more methods for handling events, messages, etc.
}
