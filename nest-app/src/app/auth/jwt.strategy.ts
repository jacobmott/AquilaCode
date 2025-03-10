import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
// import { jwtConstants } from "./constants";
import { Logger } from "@nestjs/common";
import { passportJwtSecret } from "jwks-rsa";
import config from "../../config/keys";

// https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        cacheMaxEntries: 10, // Default value 5, set to 10
        cacheMaxAge: 6000000, // Defaults to 10m, set to 100m
        rateLimit: true,
        jwksRequestsPerMinute: 6,
        jwksUri: `${config.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: `${config.AUTH0_AUDIENCE}`,
      issuer: `${config.AUTH0_ISSUER_URL}`,
      algorithms: ["RS256"],
    });
    this.logger.error("JWT constructor! ");
  }

  // async validate(payload: any) {
  //   this.logger.error("something went wrong! ", payload);
  //   return { userId: payload.sub };
  //   // return { userId: payload.sub, username: payload.username };
  // }

  validate(payload: unknown): unknown {
    this.logger.error("JWT validate! ", payload);
    return payload;
  }
}
