import { Module } from "@nestjs/common";
import { ShipController } from "./ship.controller";
import { ShipService } from "./ship.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ShipSchema } from "./schemas/ship.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Ship", schema: ShipSchema }]),
    AuthModule,
  ],
  controllers: [ShipController],
  providers: [ShipService],
})
export class ShipModule {}
