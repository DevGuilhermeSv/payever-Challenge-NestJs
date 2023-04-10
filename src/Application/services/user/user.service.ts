import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../Infrastructure/Repository/UserRepository';
import { User } from 'src/Infrastructure/Schema/UserSchema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getAll() {
    return await this.userRepository.getAll();
  }
  async getUser(id: any): Promise<User> {
    return await this.userRepository.getUser(id);
  }

  async update(id: any, data: User): Promise<User> {
    return await this.userRepository.update(id, data);
  }
  async create(data: User): Promise<User> {
    return await this.userRepository.create(data);
  }

}
