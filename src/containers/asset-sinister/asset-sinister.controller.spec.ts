import { Test, TestingModule } from '@nestjs/testing';
import { AssetSinisterController } from './asset-sinister.controller';

describe('AssetSinisterController', () => {
  let controller: AssetSinisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetSinisterController],
    }).compile();

    controller = module.get<AssetSinisterController>(AssetSinisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
