/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as YAML from "json-to-pretty-yaml";
import * as fs from "fs";

import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from "@nestjs/swagger";

import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app/app.module";

import { SpelunkerModule } from "nestjs-spelunker";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: ["error", "warn", "log"] },
  );
  console.log(SpelunkerModule.explore(app));
  const config = new DocumentBuilder()
    .setTitle("AquilaCode API")
    .setDescription("AquilaCode API, for controlling the universe")
    .setVersion("1.0")
    .addTag("AquilaCode")
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("aquila/api", app, document);
  const data = YAML.stringify(document);
  fs.writeFile("openapi/openapi.spec.yaml", data, (err) => {
    if (err) console.log(err);
    else {
      console.log("openapi.spec.yaml file has been updated successfully\n");
    }
  });
  //This writes out the json openAPI spec, you can also download it and view it (its hosted automatically)
  // @http://localhost:3000/aquila/api#/default
  // AND @
  //fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));

  const globalPrefix = "aquila";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  app.enableCors();
  await app.listen(port, "0.0.0.0");
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
