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
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/Application/services/user/user.service';
import { User } from 'src/Infrastructure/Schema/UserSchema';
@Controller('user')
export class UserController {
  private readonly userService: UserService;

  constructor(
    userService: UserService,
    @Inject('USER_CLIENT') private readonly tokenClient: ClientProxy,
  ) {
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
    const createTokenResponse = await firstValueFrom(
      this.tokenClient.send('token_create', JSON.stringify(user)),
    );
  }

  @Put()
  updateBook() {}
  @Delete()
  deleteBook() {}
}
