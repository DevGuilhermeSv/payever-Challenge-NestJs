import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../../../Infrastructure/Repository/UserRepository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { User } from '../../../Infrastructure/Schema/User.schema';
import { UserHashRepository } from '../../../Infrastructure/Repository/UserHashRepository';
import { EmailService } from '../email/email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserDto } from '../../../Application/Dto/User.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let httpService: HttpService;
  let emailService: EmailService;
  beforeEach(async () => {
    const ClientsMod = ClientsModule.register([
      { name: 'USER_CLIENT', transport: Transport.RMQ },
    ]);
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ClientsMod],
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
        {
          provide: UserHashRepository,
          useValue: {
            getUser: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    httpService = module.get<HttpService>(HttpService);
    emailService = module.get<EmailService>(EmailService);
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
      await service.getAll();
      expect(userRepository.getAll).toHaveBeenCalled();
    });
    it('getUser', async () => {
      await service.getUser('10');
      expect(userRepository.getUser).toHaveBeenCalled();
    });
    it('update', async () => {
      const user = new User();
      await service.update('10', user);
      expect(userRepository.update).toHaveBeenCalled();
    });
    it('create', async () => {
      const userDto = new UserDto();
      const user = new User();
      jest.spyOn(userRepository, 'create').mockResolvedValueOnce(user);
      jest.spyOn(service, 'sendRabbitMqEvent');

      await service.create(userDto);
      expect(emailService.sendEmail).toHaveBeenCalled();
      expect(service.sendRabbitMqEvent).toHaveBeenCalled();
      expect(userRepository.create).toHaveBeenCalled();
    });
  });
});
