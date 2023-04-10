import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './User.controller';
import { UserService } from '../../../Application/services/user/user.service';
import { UserHashService } from '../../../Application/services/userHash/userHash.service';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { User } from '../../../Infrastructure/Schema/UserSchema';
import { UserHash } from '../../../Infrastructure/Schema/UserHash';
import { Inject } from '@nestjs/common';

describe('BooksController', () => {
  let controller: UserController;
  let service: UserService;
  let userHashService: UserHashService;
  let clientProxy: ClientProxy;
  const userHash = new UserHash();
  userHash.avatarHash = '';
  userHash.id = '1';

  beforeEach(async () => {
    const ClientsMod = ClientsModule.register([
      { name: 'USER_CLIENT', transport: Transport.RMQ },
    ]);
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsMod],
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
    clientProxy = module.get<ClientProxy>('USER_CLIENT');
    console.log(clientProxy);
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
    it('should return a string', async () => {
      const result = await controller.getAvatar('10');
      expect(userHashService.getUser).toHaveBeenCalled();
      expect(typeof result).toEqual('string');
    });
    it('should generate base64 img', async () => {
      jest.spyOn(userHashService, 'getUser').mockReturnValueOnce(null);
      const result = await controller.getAvatar('10');

      expect(userHashService.getUser).toHaveBeenCalled();
      expect(userHashService.create).toHaveBeenCalled();
      expect(typeof result).toEqual('string');
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const result = controller.getUser('10');
      expect(service.getUserHttp).toHaveBeenCalled();
      expect(typeof result).toEqual('object');
    });
  });
  describe('createUser', () => {
    it('shold create user service user', async () => {
      const user = new User();
      user.id = 10;
      user.avatar = 'https://reqres.in/img/faces/10-image.jpg';
      user.first_name = 'teste';
      user.last_name = 'teste';

      jest.spyOn(clientProxy, 'emit').mockReturnValueOnce(null);
      const result = await controller.createUser(user);

      expect(service.create).toHaveBeenCalled();
      expect(clientProxy.emit).toHaveBeenCalled();
      expect(typeof result).toEqual('object');
    });
  });
  describe('deleteUserHash', () => {});
});
