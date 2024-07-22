import { Module } from "@nestjs/common";
import { ShipController } from "./ship.controller";
import { ShipService } from "./ship.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ShipSchema } from "./schemas/ship.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Ship", schema: ShipSchema }])],
  controllers: [ShipController],
  providers: [ShipService],
})
export class ShipModule {}
