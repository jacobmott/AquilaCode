import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
// import mongoose from "mongoose";

// This class/type represents the data that is sent to the database
@Schema({ timestamps: true })
export class User {
  @Prop({ unique: false, required: true })
  name?: string;

  @Prop({ required: true })
  connectionType: string;

  @Prop({ required: true })
  connectionId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
