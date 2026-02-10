// profile.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Types,Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  edad: number;

  @Prop()
  genero: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
