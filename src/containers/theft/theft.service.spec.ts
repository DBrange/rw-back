import { Test, TestingModule } from '@nestjs/testing';
import { TheftService } from './theft.service';

describe('TheftService', () => {
  let service: TheftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TheftService],
    }).compile();

    service = module.get<TheftService>(TheftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
