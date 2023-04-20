import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../Infrastructure/Repository/UserRepository';
import { User } from 'src/Infrastructure/Schema/User.schema';
import { HttpService } from '@nestjs/axios';
import { UserHashRepository } from 'src/Infrastructure/Repository/UserHashRepository';
import axios from 'axios';
import { writeFile } from 'fs';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userHashrepository: UserHashRepository,
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
  /**
   * Get the User Avatar by userId property. The image is saved on file system before be returned.
   * @param userId 
   * @returns A Buffer of the image in base64 format
   */
  async getAvatar(userId: string):Promise<Buffer> {
    try {
      let img;
      let id;
      const userHash = await this.userHashrepository.getUser(userId);
      if (userHash !== null) {
        img = userHash.avatarHash;
        id = userHash.id;
      } else {
        const user = await this.getUserHttp(userId);
        img = await this.getBase64(user.avatar);
        id = user.id;
        this.userHashrepository.create({
          id: userId,
          avatarHash: img,
        });
      }
      const buff = Buffer.from(img, 'base64');
      await this.saveImage(buff, id);
      return buff;
    } catch (error) {
      throw new Error('there was an error getting the avatar');
    }
  }
  private getBase64(url) {
    return axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((response) =>
        Buffer.from(response.data, 'binary').toString('base64'),
      );
  }
  private async saveImage(buffer: Buffer, userId: string) {
    new Promise((resolve) => {
      writeFile(`img-${userId}-Avatar.png`, buffer, () => {
        console.log('writed');
        resolve(true);
      });
    });
  }
}
