import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { CreateShipDto } from "./dto/create-ship.dto";
import { ShipService } from "./ship.service";
import { Ship } from "./interfaces/ship.interface";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("ship")
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/")
  findAll(): Promise<Ship[]> {
    return this.shipService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Ship> {
    return this.shipService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/")
  createShip(@Body() createShipDto: CreateShipDto): Promise<Ship> {
    return this.shipService.create(createShipDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deleteOne(@Param("id") id: string): Promise<Ship> {
    return this.shipService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updateOne(
    @Param("id") id: string,
    @Body() updateShipDto: CreateShipDto,
  ): Promise<Ship> {
    return this.shipService.update(id, updateShipDto);
  }
}
