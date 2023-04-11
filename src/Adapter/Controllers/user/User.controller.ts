import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';
import { UserService } from '../../../Application/services/user/user.service';
import { UserHashService } from '../../../Application/services/userHash/userHash.service';
import { User } from '../../../Infrastructure/Schema/UserSchema';
import { Response } from 'express';
import fs, { writeFile, unlink } from 'fs';
import { resolve } from 'path';

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
      let img;
      let id;
      const userHash = await this.userHash.getUser(userId);
      if (userHash !== null) {
        img = userHash.avatarHash;
        id = userHash.id;
      } else {
        const user = await this.userService.getUserHttp(userId);
        img = await this.getBase64(user.avatar);
        id = user.id;
        this.userHash.create({
          id: userId,
          avatarHash: img,
        });
      }
      const buff = Buffer.from(img, 'base64');
      await this.saveImage(buff, id);
      res.set({ 'Content-Type': 'image/png' });
      res.end(buff);
    } catch (error) {
      res.sendStatus(400);
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

  private async saveImage(buffer: Buffer, userId: string) {
    new Promise((resolve) => {
      writeFile(`img-${userId}-Avatar.png`, buffer, () => {
        console.log('writed');
        resolve(true);
      });
    });
  }
  private async deleteImage(userId: string) {
    new Promise((resolve) => {
      unlink(`img-${userId}-Avatar.png`, () => {
        console.log('Removed');
        resolve(true);
      });
    });
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
}
