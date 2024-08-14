import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { AuthModule } from "../auth/auth.module";
import { forwardRef } from "@nestjs/common";

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
})
export class UsersModule {}
