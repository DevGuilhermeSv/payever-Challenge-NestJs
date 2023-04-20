import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './User.controller';
import { UserService } from '../../../Application/services/user/user.service';
import { UserHashService } from '../../../Application/services/userHash/userHash.service';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../../../Infrastructure/Schema/User.schema';
import { UserHash } from '../../../Infrastructure/Schema/UserHash.schema';
import { Response } from 'express';
import { UserDto } from '../../../Application/Dto/User.dto';
import { HttpException } from '@nestjs/common';

describe('BooksController', () => {
  let controller: UserController;
  let service: UserService;
  let userHashService: UserHashService;
  let clientProxy: ClientProxy;
  const userHash = new UserHash();
  userHash.avatarHash = '';
  userHash.id = '1';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([]),
            getUser: jest.fn(),
            update: jest.fn(),
            create: jest.fn().mockResolvedValue(new User()),
            getUserHttp: jest.fn().mockResolvedValue({
              avatar: 'https://reqres.in/img/faces/10-image.jpg',
            }),
            getAvatar: jest.fn(),
          },
        },
        {
          provide: UserHashService,
          useValue: {
            getAll: jest.fn(),
            getUser: jest.fn().mockResolvedValue(userHash),
            update: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    userHashService = module.get<UserHashService>(UserHashService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getAll', () => {
    it('should return a user List', async () => {
      const result = await controller.getAllUser();
      expect(result).toEqual([]);
    });
  });

  describe('getAvatar', () => {
    it('should a exception', async () => {
      const res = {} as unknown as Response;
      res.status = jest.fn();
      res.send = jest.fn();
      jest.spyOn(service, 'getAvatar').mockImplementation(() => {
        throw new Error();
      });
      await controller.getAvatar('10', res);

      expect(service.getAvatar).toThrow();
      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
    });
    it('should generate base64 img', async () => {
      const res = {} as unknown as Response;
      res.set = jest.fn();
      res.end = jest.fn();

      jest.spyOn(service, 'getAvatar').mockReturnValueOnce(null);
      await controller.getAvatar('10', res);

      expect(service.getAvatar).toHaveBeenCalled();
      expect(res.set).toHaveBeenCalled();
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      controller.getUser('10');
      expect(service.getUserHttp).toHaveBeenCalled();
    });
  });
  describe('createUser', () => {
    it('shold create user service user', async () => {
      const user = new UserDto();
      user.avatar = 'https://reqres.in/img/faces/10-image.jpg';
      user.first_name = 'teste';
      user.last_name = 'teste';

      const result = await controller.createUser(user);

      expect(service.create).toHaveBeenCalled();
      expect(typeof result).toEqual('object');
    });
  });
  describe('deleteUserHash', () => {});
});
