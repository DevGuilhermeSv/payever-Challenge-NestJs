import { Injectable } from '@nestjs/common';
import Repository from './Repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Schema/User.schema';
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
  getUser(id: any): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
