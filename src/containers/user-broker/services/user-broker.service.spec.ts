import { Test, TestingModule } from '@nestjs/testing';
import { UserBrokerService } from './user-broker.service';

describe('UserBrokerService', () => {
  let service: UserBrokerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBrokerService],
    }).compile();

    service = module.get<UserBrokerService>(UserBrokerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
