import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Infrastructure/Repository/UserRepository';
import { User } from 'src/Infrastructure/Schema/UserSchema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
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

  delete(): void {
    throw new Error('Method not implemented.');
  }
  // private transform(bookDto: BookDto): User {
  //   const book = new User();
  //   book.name = bookDto.name;
  //   book.authorId = bookDto.authorId;
  //   book.language = bookDto.language;
  //   book.releaseYear = bookDto.releaseYear;
  //   book.publisher = bookDto.publisher;
  //   book.pages = bookDto.pages;
  //   return book;
  // }
}
