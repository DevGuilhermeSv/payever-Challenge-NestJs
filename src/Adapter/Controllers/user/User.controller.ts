import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from '../../../Application/services/user/user.service';
import { UserHashService } from '../../../Application/services/userHash/userHash.service';
import { User } from '../../../Infrastructure/Schema/User.schema';
import { Response } from 'express';
import { UserDto } from 'src/Application/Dto/User.dto';

@Controller('api')
export class UserController {
  private readonly userService: UserService;
  private readonly userHash: UserHashService;

  constructor(userService: UserService, _userHash: UserHashService) {
    this.userHash = _userHash;
    this.userService = userService;
  }
  @Get('/user')
  async getAllUser() {
    return await this.userService.getAll();
  }

  @Get('/user/:id/avatar')
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

  @Get('/user/:id')
  async getUser(@Param('id') userId: string): Promise<User> {
    return await this.userService.getUserHttp(userId);
  }

  @Post('/users')
  async createUser(@Body() user: UserDto): Promise<User> {
    const result = await this.userService.create(user);
    return result;
  }

  @Delete('/user/:id/avatar')
  deleteUserHash(@Param('id') userId: string) {
    return this.userHash.delete(userId);
  }
}
