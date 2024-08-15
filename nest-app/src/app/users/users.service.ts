import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

// This should be a real class/interface representing a user entity
// export type User = any;
// export type TempUser = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: "john",
  //     password: "changeme",
  //   },
  //   {
  //     userId: 2,
  //     username: "maria",
  //     password: "guess",
  //   },
  // ];

  // async findOneUserTemp(username: string): Promise<TempUser | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }

  async calcUserData(createuserDto: CreateUserDto): Promise<User> {
    const connectionType = this.getConnectionType();
    const connectionId = this.getConnectionId(createuserDto.connectionInfo);
    const existingUser = await this.findByConnection(
      connectionId,
      connectionType,
    );
    if (existingUser) {
      return existingUser;
    }
    const user: User = {
      name: this.generateName(),
      connectionType: connectionType,
      connectionId: connectionId,
    };
    return user;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  generateName(): string {
    const names = [
      "Draconis",
      "Aquila",
      "Lupinus",
      "Serpens",
      "Corvus",
      "Leo",
      "Astralis",
      "Capricornus",
      "Taurus",
      "Pisces",
      "Nauta",
      "Ursa",
      "Majoris",
    ];
    const index = this.getRandomInt(names.length + 1);

    return names[index];
  }

  getConnectionType(): string {
    // This is all we support right now
    return "google";
  }

  getConnectionId(connectionInfo: string): string {
    return connectionInfo.split("|")[1];
  }

  async findByConnection(id: string, type: string): Promise<User> {
    return await this.userModel.findOne({
      connectionType: type,
      connectionId: id,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  // async findOne(id: string): Promise<User> {
  //   return await this.userModel.findOne({ _id: id });
  // }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({
      connectionId: id,
      connectionType: "google",
    });
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user, { upsert: true });
    return await createdUser.save();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async createOrupdate(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }
}
