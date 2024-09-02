import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Logger } from "@nestjs/common";

@Injectable()
export class JwtAuthGuardWS extends AuthGuard("wsjwt") {
  private readonly logger = new Logger(JwtAuthGuardWS.name);

  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    this.logger.error("JwtAuthGuardWS getRequest! ");
    this.logger.error(context.switchToWs().getClient().handshake);
    return context.switchToWs().getClient().handshake;
  }

  //   canActivate(context: ExecutionContext) {
  //     const client = context.switchToWs().getClient();
  //     const authorization = client.handshake.headers?.authorization;

  //     if (!authorization) {
  //       return false;
  //     }

  //     const [, token] = authorization.split(" ");

  //     try {
  //       return super.canActivate(context);
  //     } catch (error) {
  //       return false;
  //     }
  //   }
}
