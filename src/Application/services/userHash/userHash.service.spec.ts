import { Test, TestingModule } from '@nestjs/testing';
import { UserHashRepository } from '../../../Infrastructure/Repository/UserHashRepository';
import { UserHashService } from './userHash.service';

describe('UserService', () => {
  let service: UserHashService;
  let userHashRepository: UserHashRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserHashService,
        {
          provide: UserHashRepository,
          useValue: {
            getUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserHashService>(UserHashService);
    userHashRepository = module.get<UserHashRepository>(UserHashRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
