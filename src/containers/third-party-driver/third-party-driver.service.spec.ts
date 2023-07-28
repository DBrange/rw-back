import { Test, TestingModule } from '@nestjs/testing';
import { ThirdPartyDriverService } from './third-party-driver.service';

describe('ThirdPartyDriverService', () => {
  let service: ThirdPartyDriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThirdPartyDriverService],
    }).compile();

    service = module.get<ThirdPartyDriverService>(ThirdPartyDriverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
