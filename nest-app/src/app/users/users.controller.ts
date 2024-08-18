import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "./schemas/user.schema";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/")
  @UsePipes(new ValidationPipe())
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
  @UsePipes(new ValidationPipe())
  async usersCreate(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
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
