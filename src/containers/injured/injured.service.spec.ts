import { Test, TestingModule } from '@nestjs/testing';
import { InjuredService } from './injured.service';

describe('InjuredService', () => {
  let service: InjuredService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InjuredService],
    }).compile();

    service = module.get<InjuredService>(InjuredService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
