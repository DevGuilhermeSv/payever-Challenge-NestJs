import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from 'src/Application/services/user/user.service';
import { User } from 'src/Infrastructure/Schema/UserSchema';
@Controller('user')
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  @Get()
  async getAllBooks() {
    return await this.userService.getAll();
  }
  @Get(':id')
  async getBook(@Param('id') id: any): Promise<User> {
    return await this.userService.getUser(id);
  }

  @Post()
  async createBook(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }
  @Put()
  updateBook() {}
  @Delete()
  deleteBook() {}
}
