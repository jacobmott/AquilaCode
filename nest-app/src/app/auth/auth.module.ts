import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
// import { JwtModule } from "@nestjs/jwt";
// import { jwtConstants } from "./constants";
import { forwardRef } from "@nestjs/common";
import { JwtWSStrategy } from "./jwt-ws.strategy";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: "60s" },
    // }),
  ],
  providers: [AuthService, JwtStrategy, JwtWSStrategy],
  exports: [AuthService],
})
export class AuthModule {}
