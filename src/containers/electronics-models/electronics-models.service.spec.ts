import { Test, TestingModule } from '@nestjs/testing';
import { ElectronicsModelsService } from './electronics-models.service';

describe('ElectronicsModelsService', () => {
  let service: ElectronicsModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectronicsModelsService],
    }).compile();

    service = module.get<ElectronicsModelsService>(ElectronicsModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
