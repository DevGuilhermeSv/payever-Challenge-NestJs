import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../Infrastructure/Repository/UserRepository';
import { User } from 'src/Infrastructure/Schema/UserSchema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private httpService: HttpService,
  ) {}
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
  async getUserHttp(userId: string): Promise<User> {
    return new Promise((resolve) => {
      this.httpService
        .get(`https://reqres.in/api/users/${userId}`, {
          headers: {
            Accept: 'application/json',
          },
        })
        .subscribe((data: any) => {
          resolve(data.data.data);
        });
    });
  }
}
