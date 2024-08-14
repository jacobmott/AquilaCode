import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import config from "../config/keys";
import { ShipModule } from "./ship/ship.module";

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
    ShipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
