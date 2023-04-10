import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './User.controller';
import { UserService } from '../../../Application/services/user/user.service';
import { UserHashService } from '../../../Application/services/userHash/userHash.service';
import { UserRepository } from 'src/Infrastructure/Repository/UserRepository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('BooksController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ClientsModule.register([
          { name: 'USER_CLIENT', transport: Transport.RMQ },
        ]),
      ],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn(),
            getUser: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: UserHashService,
          useValue: {
            getAll: jest.fn(),
            getUser: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
