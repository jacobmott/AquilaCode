import { Module } from "@nestjs/common";
import { ShipsController } from "./ships.controller";
import { ShipsService } from "./ships.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ShipsSchema, Ship } from "./schemas/ship.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ship.name, schema: ShipsSchema }]),
    AuthModule,
  ],
  controllers: [ShipsController],
  providers: [ShipsService],
})
export class ShipsModule {}
