import { Test, TestingModule } from '@nestjs/testing';
import { AssetSinisterService } from './asset-sinister.service';

describe('AssetSinisterService', () => {
  let service: AssetSinisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetSinisterService],
    }).compile();

    service = module.get<AssetSinisterService>(AssetSinisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
