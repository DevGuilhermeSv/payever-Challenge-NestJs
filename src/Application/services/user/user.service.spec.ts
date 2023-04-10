import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../../../Infrastructure/Repository/UserRepository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { User } from '../../../Infrastructure/Schema/UserSchema';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let httpService: HttpService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            getUser: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('test methods', () => {
    it('sucess case', async () => {
      const result = await service.getUserHttp('10');
      expect(typeof result).toEqual('object');
      expect(result.id).toEqual(10);
    });
    it('getAll', async () => {
      const result = await service.getAll();
      expect(userRepository.getAll).toHaveBeenCalled();
    });
    it('getUser', async () => {
      const result = await service.getUser('10');
      expect(userRepository.getUser).toHaveBeenCalled();
    });
    it('update', async () => {
      const user = new User();
      const result = await service.update('10', user);
      expect(userRepository.update).toHaveBeenCalled();
    });
    it('create', async () => {
      const user = new User();
      const result = await service.create(user);
      expect(userRepository.create).toHaveBeenCalled();
    });
  });
});
