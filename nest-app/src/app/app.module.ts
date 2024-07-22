import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ShipModule } from "./ship/ship.module";
import { MongooseModule } from "@nestjs/mongoose";
import config from "../config/keys";

@Module({
  imports: [ShipModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
