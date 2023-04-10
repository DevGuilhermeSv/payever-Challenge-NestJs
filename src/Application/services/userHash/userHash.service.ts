import { Injectable } from '@nestjs/common';
import { UserHashRepository } from '../../../Infrastructure/Repository/UserHashRepository';
import { UserHash } from 'src/Infrastructure/Schema/UserHash';

@Injectable()
export class UserHashService {
  constructor(private readonly userHashRepository: UserHashRepository) {}

  async getAll() {
    return await this.userHashRepository.getAll();
  }
  async getUser(id: any): Promise<UserHash> {
    return await this.userHashRepository.getUser(id);
  }

  async create(data: UserHash): Promise<UserHash> {
    return await this.userHashRepository.create(data);
  }
  async delete(id: string){
    return await this.userHashRepository.delete(id);
  }
  
}
