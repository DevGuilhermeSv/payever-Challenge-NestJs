import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';
import { UserService } from '../../../Application/services/user/user.service';
import { UserHashService } from '../../../Application/services/userHash/userHash.service';
import { User } from '../../../Infrastructure/Schema/User.schema';
import { Response } from 'express';
import { writeFile, unlink } from 'fs';

@Controller('api/user')
export class UserController {
  private readonly userService: UserService;
  private readonly userHash: UserHashService;

  constructor(
    userService: UserService,
    _userHash: UserHashService,
    @Inject('USER_CLIENT') private readonly tokenClient: ClientProxy,
  ) {
    this.userHash = _userHash;
    this.userService = userService;
  }
  @Get()
  async getAllUser() {
    return await this.userService.getAll();
  }

  @Get(':id/avatar')
  async getAvatar(@Param('id') userId: string, @Res() res: Response) {
    try {
      const result = this.userService.getAvatar(userId);
      res.set({ 'Content-Type': 'image/png' });
      res.end(result);
    } catch (error) {
      res.status(400);
      res.send(error);
    }
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User> {
    return await this.userService.getUserHttp(userId);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    const dbReturn = await this.userService.create(user);

    this.tokenClient.emit('client_create', JSON.stringify(dbReturn));
    return dbReturn;
  }

  @Delete('/:id/avatar')
  deleteUserHash(@Param('id') userId: string) {
    this.deleteImage(userId);
    return this.userHash.delete(userId);
  }

  private async deleteImage(userId: string) {
    new Promise((resolve) => {
      unlink(`img-${userId}-Avatar.png`, () => {
        console.log('Removed');
        resolve(true);
      });
    });
  }
}
