import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule} from '@nestjs/config';
import { ProfileModule } from './modules/users/profiles.module';
import { AuthModule } from './modules/users/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProfileModule,
    AuthModule,
    // Local connecttion string: mongodb://localhost:27017/nest
    MongooseModule.forRoot('mongodb+srv://nicoenrico2013:CHzKlteeRAqvpG2J@cluster0.ox7og.mongodb.net/user-crud?retryWrites=true&w=majority&appName=Cluster0')],
})
export class AppModule {}
