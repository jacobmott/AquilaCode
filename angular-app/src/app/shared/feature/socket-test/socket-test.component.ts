import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewChecked,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SocketService } from "../../data-access/socket.service";
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
export class SocketTestComponent implements OnInit, AfterViewChecked {
  myForm: FormGroup;
  messages: { isSelf: boolean; identifier: string; msg: string }[] = [];
  arrowFillColor = "#8E37E6";
  mainClass =
    "z-11 bg-aquila-400 -bottom-2/6 fixed right-1 h-2/6 w-3/6  rounded-md border-8 transition-all duration-300 ease-in hover:bottom-1";
  mainClassToggle =
    "z-11 bg-aquila-400 -bottom-2/6 fixed right-1 h-2/6 w-3/6  rounded-md border-8 transition-all duration-300 ease-in hover:bottom-1";
  toggle = false;
  wantScrollBottomBehavior = true;

  @ViewChild("scrollMe") private myScrollContainer: ElementRef;

  constructor(private socketService: SocketService) {
    this.myForm = new FormGroup({
      message: new FormControl("", Validators.required),
    });
  }

  sendMessage(msg: string) {
    this.socketService.sendMessage(msg);
    this.messages.push({ isSelf: true, identifier: "You", msg: msg });
    this.wantScrollBottomBehavior = true;
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  onScroll(event: any): void {
    this.checkWantScrollBottomBehavior();
  }

  isAtBottom(): boolean {
    const sh = Math.trunc(this.myScrollContainer.nativeElement.scrollHeight);
    const st = Math.trunc(this.myScrollContainer.nativeElement.scrollTop);
    const ch = Math.trunc(this.myScrollContainer.nativeElement.clientHeight);
    const value1 = Math.trunc(sh - st);
    const value2 = Math.trunc(ch);
    // console.log("sh: " + sh);
    // console.log("st: " + st);
    // console.log("ch: " + ch);
    // console.log("sh-st = " + value1);
    // console.log("ch = " + value2);
    //just need to be within +-1
    return value1 === value2 || value1 === value2 + 1 || value1 === value2 - 1;
  }

  checkWantScrollBottomBehavior() {
    if (this.isAtBottom()) {
      // Do something when the scrollbar is  at the bottom
      // console.log("At the bottom");
      this.wantScrollBottomBehavior = true;
    } else {
      // console.log("Not at the bottom");
      this.wantScrollBottomBehavior = false;
    }
  }

  scrollToBottom(): void {
    if (!this.wantScrollBottomBehavior) {
      return;
    }
    this.myScrollContainer.nativeElement.scrollTop =
      this.myScrollContainer.nativeElement.scrollHeight;
  }

  ngOnInit() {
    this.socketService.getBroadcastMessage().subscribe((data) => {
      this.checkWantScrollBottomBehavior();
      this.messages.push({
        isSelf: false,
        identifier: data.clientId,
        msg: data.message,
      });
    });
    this.socketService.getConnectedMessage().subscribe((clientId) => {
      this.checkWantScrollBottomBehavior();
      this.messages.push({
        isSelf: false,
        identifier: clientId,
        msg: " (connected)",
      });
    });
    this.socketService.getDisconnectedMessage().subscribe((clientId) => {
      this.checkWantScrollBottomBehavior();
      this.messages.push({
        isSelf: false,
        identifier: clientId,
        msg: " (disconnected)",
      });
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    this.sendMessage(this.myForm.value.message);
    this.checkWantScrollBottomBehavior();
    this.myForm.reset();
  }

  onPointerDown(event: MouseEvent) {
    if (this.toggle) {
      this.toggle = false;
      this.mainClass = this.mainClassToggle;
    } else {
      this.mainClass =
        "z-11 bg-aquila-400 bottom-1 fixed right-1 h-2/6 w-3/6 rounded-md border-8";
      this.toggle = true;
    }
  }

  getClasses() {
    return this.mainClass;
  }
}
