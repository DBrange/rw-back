import { Test, TestingModule } from '@nestjs/testing';
import { ElectronicsModelsController } from './electronics-models.controller';

describe('ElectronicsModelsController', () => {
  let controller: ElectronicsModelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectronicsModelsController],
    }).compile();

    controller = module.get<ElectronicsModelsController>(ElectronicsModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
