import { Test, TestingModule } from '@nestjs/testing';
import { TheftTheftTireService } from './theft-theft-tire.service';

describe('TheftTheftTireService', () => {
  let service: TheftTheftTireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TheftTheftTireService],
    }).compile();

    service = module.get<TheftTheftTireService>(TheftTheftTireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
