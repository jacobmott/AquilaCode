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
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./interfaces/user.interface";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/")
  usersFindAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  usersFindOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async usersCreate(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.usersService.calcUserData(createUserDto);
    return this.usersService.create(user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete(":id")
  // deleteOne(@Param("id") id: string): Promise<User> {
  //   return this.usersService.delete(id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put(":id")
  // updateOne(
  //   @Param("id") id: string,
  //   @Body() updateUserDto: CreateUserDto,
  // ): Promise<User> {
  //   return this.usersService.update(id, updateUserDto);
  // }
}
