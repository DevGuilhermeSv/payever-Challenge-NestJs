import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Application/user.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/libary'),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
