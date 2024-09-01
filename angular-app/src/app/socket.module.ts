import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { environment } from "../environments/environment";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
console.log(environment.socketUrl);
const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: { path: environment.socketUrlPath },
};

@NgModule({
  declarations: [],
  imports: [CommonModule, SocketIoModule.forRoot(config)],
  providers: [],
})
export class SocketModule {}
