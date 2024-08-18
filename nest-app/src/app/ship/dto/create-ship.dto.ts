// import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

// This class/type represents the data that will be sent to the server when creating a new user

export class CreateShipDto {
  @IsOptional()
  @IsString()
  name: string;

  //This is connectionType and connectionId in a single string from the user
  //we split it later into its 2 parts to use with UserSchema and save to the database
  @IsNotEmpty()
  @IsString()
  speed: string;

  //This is connectionType and connectionId in a single string from the user
  //we split it later into its 2 parts to use with UserSchema and save to the database
  @IsNotEmpty()
  @IsNumber()
  crew: string;
}
