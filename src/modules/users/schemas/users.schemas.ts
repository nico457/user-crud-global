import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,Types } from 'mongoose';
import { Profile } from './profiles.schemas';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({required: true})
  username: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true, unique: true})
  role: string;

@Prop({ type: Types.ObjectId, ref: 'Profile' })
profile: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

