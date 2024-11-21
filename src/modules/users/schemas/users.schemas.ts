import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({required: true})
  nombre: string;

  @Prop({required: true})
  apellido: string;

  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

