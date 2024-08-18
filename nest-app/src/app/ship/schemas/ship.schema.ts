import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
// import mongoose from "mongoose";

// This class/type represents the data that is sent to the database
@Schema({ timestamps: true })
export class Ship {
  @Prop({ unique: false, required: true })
  name?: string;

  @Prop({ required: true })
  speed: string;

  @Prop({ required: true })
  crew: number;
}

export const ShipsSchema = SchemaFactory.createForClass(Ship);
