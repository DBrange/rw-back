import { Test, TestingModule } from '@nestjs/testing';
import { SinisterTypeService } from './sinister-type.service';

describe('SinisterTypeService', () => {
  let service: SinisterTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinisterTypeService],
    }).compile();

    service = module.get<SinisterTypeService>(SinisterTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
