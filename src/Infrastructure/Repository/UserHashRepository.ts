import { Injectable } from '@nestjs/common';
import Repository from './Repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Schema/UserSchema';
import { UserHash } from '../Schema/UserHash';

@Injectable()
export class UserHashRepository extends Repository<UserHash> {
  constructor(
    @InjectModel(UserHash.name) private readonly userHashmodel: Model<UserHash>,
  ) {
    super(userHashmodel);
  }
  async getUser(id: any): Promise<UserHash> {
    return this.userHashmodel.findOne({ id: id }).exec();
  }
}
