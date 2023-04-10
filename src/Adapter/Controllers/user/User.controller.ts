import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';
import { UserService } from 'src/Application/services/user/user.service';
import { UserHashService } from 'src/Application/services/userHash/userHash.service';
import { User } from 'src/Infrastructure/Schema/UserSchema';

@Controller('api/user')
export class UserController {
  private readonly userService: UserService;
  private readonly userHash: UserHashService;

  constructor(
    userService: UserService,
    private readonly httpService: HttpService,
    private readonly _userHash: UserHashService,
    @Inject('USER_CLIENT') private readonly tokenClient: ClientProxy,
  ) {
    this.userHash = _userHash;
    this.userService = userService;
  }
  @Get()
  async getAllUser() {
    return await this.userService.getAll();
  }
  @Get('/UserHash')
  async getUserHash() {
    return this.userHash.getAll();
  }
  @Get(':id/avatar')
  async getAvatar(@Param('id') userId: string) {
    const user = await this.getUserHttp(userId);
    const userHash = await this.userHash.getUser(userId);
    if (userHash !== null) {
      return userHash.avatarHash;
    } else {
      const img = await this.getBase64(user.avatar);

      this.userHash.create({
        id: userId,
        avatarHash: img,
      });
      return img;
    }
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User> {
    return await this.getUserHttp(userId);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    const dbReturn = await this.userService.create(user);

    this.tokenClient.emit('client_create', JSON.stringify(dbReturn));
    return dbReturn;
  }

  // @Put()
  // updateBook() {}
  @Delete('/:id')
  deleteUserHash(@Param('id') userId: string) {
    return this.userHash.delete(userId);
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
  private async getUserHttp(userId: string): Promise<User> {
    return new Promise((resolve) => {
      this.httpService
        .get(`https://reqres.in/api/users/${userId}`, {
          headers: {
            Accept: 'application/json',
          },
        })
        .subscribe((data: any) => {
          console.log(data);
          resolve(data.data.data);
        });
    });
  }
}
