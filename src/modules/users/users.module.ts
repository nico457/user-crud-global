import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/users.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profiles.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ProfileModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
