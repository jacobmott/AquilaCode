import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SocketService } from "../../data-access/socket.service";
import { OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-aquila-socket-test",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./socket-test.component.html",
  styleUrl: "./socket-test.component.css",
  encapsulation: ViewEncapsulation.Emulated,
})
export class SocketTestComponent implements OnInit {
  myForm: FormGroup;
  messages: string[] = ["..."];

  constructor(private socketService: SocketService) {
    this.myForm = new FormGroup({
      message: new FormControl("", Validators.required),
    });
  }

  sendMessage(msg: string) {
    this.socketService.sendMessage(msg);
    this.messages.push("you: " + " -> " + msg);
  }

  ngOnInit() {
    this.socketService.getBroadcastMessage().subscribe((data) => {
      console.log(
        "BroadcastedMessage",
        "clientId:",
        data.clientId,
        "message:",
        data.message,
      );
      this.messages.push("clientId: " + data.clientId + " -> " + data.message);
    });
    this.socketService.getConnectedMessage().subscribe((clientId) => {
      console.log("ConnectedMessage", "client connected: clientId: ", clientId);
      this.messages.push("connected: clientId: " + clientId);
    });
    this.socketService.getDisconnectedMessage().subscribe((clientId) => {
      console.log(
        "DisconnectedMessage",
        "client disconnected: clientId: ",
        clientId,
      );
      this.messages.push("disconnected: clientId: " + clientId);
    });
  }

  onSubmit() {
    this.sendMessage(this.myForm.value.message);
    this.myForm.reset();
    console.log(this.myForm.value.message); // Access the username value
  }
}
