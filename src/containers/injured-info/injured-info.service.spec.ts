import { Test, TestingModule } from '@nestjs/testing';
import { InjuredInfoService } from './injured-info.service';

describe('InjuredInfoService', () => {
  let service: InjuredInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InjuredInfoService],
    }).compile();

    service = module.get<InjuredInfoService>(InjuredInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
