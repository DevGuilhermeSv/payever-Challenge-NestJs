import { Module } from '@nestjs/common';
import { UserController } from '../Adapter/Controllers/user/User.controller';
import { UserService } from './services/user/user.service';
import { UserRepository } from '../Infrastructure/Repository/UserRepository';
import { UserHashService } from './services/userHash/userHash.service';
import { UserHashRepository } from '../Infrastructure/Repository/UserHashRepository';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Infrastructure/Schema/User.schema';
import {
  UserHash,
  UserHashSchema,
} from '../Infrastructure/Schema/UserHash.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailService } from './services/email/email.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserHash.name, schema: UserHashSchema },
    ]),
    ClientsModule.register([{ name: 'USER_CLIENT', transport: Transport.RMQ }]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserHashService,
    UserHashRepository,
    EmailService,
  ],
})
export class UserModule {}
