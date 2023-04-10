import { Module } from '@nestjs/common';
import { UserController } from './Adapter/Controllers/user/User.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './Application/services/user/user.service';
import { UserRepository } from './Infrastructure/Repository/UserRepository';
import { User, UserSchema } from './Infrastructure/Schema/UserSchema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/libary'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
