import { Test, TestingModule } from '@nestjs/testing';
import { LegalUsersService } from './legal-users.service';

describe('LegalUsersService', () => {
  let service: LegalUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegalUsersService],
    }).compile();

    service = module.get<LegalUsersService>(LegalUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
