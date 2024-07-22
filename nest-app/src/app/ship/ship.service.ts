import { Injectable } from "@nestjs/common";
import { Ship } from "./interfaces/ship.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ShipService {
  constructor(@InjectModel("Ship") private readonly shipModel: Model<Ship>) {}

  async findAll(): Promise<Ship[]> {
    return await this.shipModel.find();
  }

  async findOne(id: string): Promise<Ship> {
    return await this.shipModel.findOne({ _id: id });
  }

  async create(ship: Ship): Promise<Ship> {
    const createdShip = new this.shipModel(ship);
    return await createdShip.save();
  }

  async delete(id: string): Promise<Ship> {
    return await this.shipModel.findByIdAndDelete(id);
  }

  async update(id: string, ship: Ship): Promise<Ship> {
    return await this.shipModel.findByIdAndUpdate(id, ship, { new: true });
  }
}
