import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { environment } from "../environments/environment";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

@NgModule({
  declarations: [],
  imports: [CommonModule, SocketIoModule.forRoot(config)],
  providers: [SocketIoModule],
})
export class SocketModule {}
