import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateShipDto } from "./dto/create-ship.dto";
import { ShipsService } from "./ships.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Ship } from "./schemas/ship.schema";

@Controller("ships")
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/")
  @UsePipes(new ValidationPipe())
  shipsFindAll(): Promise<Ship[]> {
    return this.shipsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  shipsFindOne(@Param("id") id: string): Promise<Ship> {
    return this.shipsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/")
  shipsCreate(@Body() createShipDto: CreateShipDto): Promise<Ship> {
    return this.shipsService.create(createShipDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  shipsDeleteOne(@Param("id") id: string): Promise<Ship> {
    return this.shipsService.delete(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Put(":id")
  // shipsUpdateOne(
  //   @Param("id") id: string,
  //   @Body() updateShipDto: CreateShipDto,
  // ): Promise<Ship> {
  //   return this.shipsService.update(id, updateShipDto);
  // }
}
