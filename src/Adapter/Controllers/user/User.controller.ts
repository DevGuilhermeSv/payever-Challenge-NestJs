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
import { AxiosResponse } from 'axios';
import { Observable, firstValueFrom, map } from 'rxjs';
import { UserService } from 'src/Application/services/user/user.service';
import { User } from 'src/Infrastructure/Schema/UserSchema';
import * as fs from 'node:fs';
import { resourceUsage } from 'node:process';
import { resolve } from 'node:path';
@Controller('user')
export class UserController {
  private readonly userService: UserService;

  constructor(
    userService: UserService,
    private readonly httpService: HttpService,
    @Inject('USER_CLIENT') private readonly tokenClient: ClientProxy,
  ) {
    this.userService = userService;
  }
  @Get()
  async getAllUser() {
    return await this.userService.getAll();
  }

  @Get(':id/avatar')
  getAvatar(@Param('id') userId: string) {
    const user = this.getUserHttp(userId);
    // user.subscribe();
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User> {
    return await this.getUserHttp(userId);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    const dbReturn = await this.userService.create(user);
    const createTokenResponse = await firstValueFrom(
      this.tokenClient.emit('client_create', JSON.stringify(dbReturn)),
    );
    return dbReturn;
  }

  @Put()
  updateBook() {}
  @Delete()
  deleteBook() {}

  private base64_encode(file) {
    // convert binary data to base64 encoded string
    return fs.readFileSync(file, 'base64');
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
          resolve(data.data);
        });
    });
  }
}
