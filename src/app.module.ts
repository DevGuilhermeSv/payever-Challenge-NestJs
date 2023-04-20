import { Module } from '@nestjs/common';
import { UserController } from './Adapter/Controllers/user/User.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './Application/services/user/user.service';
import { UserRepository } from './Infrastructure/Repository/UserRepository';
import { User, UserSchema } from './Infrastructure/Schema/User.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { UserHash, UserHashSchema } from './Infrastructure/Schema/UserHash.schema';
import { UserHashRepository } from './Infrastructure/Repository/UserHashRepository';
import { UserHashService } from './Application/services/userHash/userHash.service';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/libary'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserHash.name, schema: UserHashSchema },
    ]),

    ClientsModule.register([{ name: 'USER_CLIENT', transport: Transport.RMQ }]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserHashService, UserHashRepository],
})
export class AppModule {}
