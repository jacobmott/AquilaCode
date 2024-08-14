import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
// import { jwtConstants } from "./constants";
import { Logger } from "@nestjs/common";
import { passportJwtSecret } from "jwks-rsa";

// https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 6,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ["RS256"],
    });
    // this.logger.error("something went wrong! ");
  }

  // async validate(payload: any) {
  //   this.logger.error("something went wrong! ", payload);
  //   return { userId: payload.sub };
  //   // return { userId: payload.sub, username: payload.username };
  // }

  validate(payload: unknown): unknown {
    // this.logger.error("something went wrong! ", payload);
    return payload;
  }
}
