import { Test, TestingModule } from '@nestjs/testing';
import { DamageService } from './damage.service';

describe('DamageService', () => {
  let service: DamageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DamageService],
    }).compile();

    service = module.get<DamageService>(DamageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
