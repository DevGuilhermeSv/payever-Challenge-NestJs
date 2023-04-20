import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../Infrastructure/Repository/UserRepository';
import { User } from 'src/Infrastructure/Schema/User.schema';
import { HttpService } from '@nestjs/axios';
import { UserHashRepository } from 'src/Infrastructure/Repository/UserHashRepository';
import axios from 'axios';
import { writeFile } from 'fs';
import { UserDto } from 'src/Application/Dto/User.dto';
import { EmailOptions } from '../email/emailOptions';
import { EmailService } from '../email/email.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userHashrepository: UserHashRepository,
    private readonly emailService: EmailService,
    @Inject('USER_CLIENT') private readonly tokenClient: ClientProxy,
    private httpService: HttpService,
  ) {}
  async getAll() {
    return await this.userRepository.getAll();
  }
  async getUser(id: any): Promise<User> {
    return await this.userRepository.getUser(id);
  }

  async update(id: any, data: UserDto): Promise<User> {
    return await this.userRepository.update(id, data);
  }
  async create(data: UserDto): Promise<User> {
    try {
      const result = await this.userRepository.create(data);

      //send RabbitMq Event
      this.sendRabbitMqEvent(result);

      //send Email event
      const emailOption = new EmailOptions();
      emailOption.to = result.email;
      emailOption.text = 'User create with sucess';
      this.emailService.sendEmail(emailOption);

      return result;
    } catch (error) {
      throw new BadRequestException({
        error: 'not was possible create a new user',
        description: error,
      });
    }
  }
  sendRabbitMqEvent(data: User) {
    this.tokenClient.emit('client_create', JSON.stringify(data));
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
  async getAvatar(userId: string): Promise<Buffer> {
    try {
      let img: string;
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
