import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import config from "../config/keys";
import { ShipsModule } from "./ship/ships.module";
import { SocketModule } from "./socket/socket.module";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI, {
      dbName: config.mongoDbName,
      auth: {
        username: config.mongoDbUser,
        password: config.mongoDbPass,
      },
    }),
    AuthModule,
    ShipsModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
