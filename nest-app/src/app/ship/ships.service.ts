import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateShipDto } from "./dto/create-ship.dto";
import { Ship } from "./schemas/ship.schema";

@Injectable()
export class ShipsService {
  constructor(
    @InjectModel(Ship.name) private readonly shipModel: Model<Ship>,
  ) {}

  async findAll(): Promise<Ship[]> {
    return await this.shipModel.find();
  }

  async findOne(id: string): Promise<Ship> {
    return await this.shipModel.findOne({ _id: id });
  }

  async create(createShipDto: CreateShipDto): Promise<Ship> {
    const createdShip = new this.shipModel(createShipDto);
    return await createdShip.save();
  }

  async delete(id: string): Promise<Ship> {
    return await this.shipModel.findByIdAndDelete(id);
  }

  async update(id: string, ship: Ship): Promise<Ship> {
    return await this.shipModel.findByIdAndUpdate(id, ship, { new: true });
  }
}
