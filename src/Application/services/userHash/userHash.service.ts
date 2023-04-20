import { BadRequestException, Injectable } from '@nestjs/common';
import { UserHashRepository } from '../../../Infrastructure/Repository/UserHashRepository';
import { UserHash } from 'src/Infrastructure/Schema/UserHash.schema';
import { unlink } from 'fs';

@Injectable()
export class UserHashService {
  constructor(private readonly userHashRepository: UserHashRepository) { }

  async getAll() {
    return await this.userHashRepository.getAll();
  }
  async getUser(id: any): Promise<UserHash> {
    return await this.userHashRepository.getUser(id);
  }

  async create(data: UserHash): Promise<UserHash> {
    return await this.userHashRepository.create(data);
  }
  async delete(id: string) {
    try {
      await this.deleteImageFile(id);
     
    }
    catch (err) {
      throw new BadRequestException('not was possible remove the file from sytem')
    }
    return await this.userHashRepository.delete(id);
  }
  async deleteImageFile(userId: string) {
    return new Promise((resolve,reject) => {

      unlink(`img-${userId}-Avatar.png`,(err)=>{
        if (err) reject(err)
        else resolve(true);
      });
    })
  }

}
