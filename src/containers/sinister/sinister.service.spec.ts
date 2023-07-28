import { Test, TestingModule } from '@nestjs/testing';
import { SinisterService } from './sinister.service';

describe('SinisterService', () => {
  let service: SinisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinisterService],
    }).compile();

    service = module.get<SinisterService>(SinisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
