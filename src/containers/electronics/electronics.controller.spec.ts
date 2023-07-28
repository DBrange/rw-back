import { Test, TestingModule } from '@nestjs/testing';
import { ElectronicsController } from './electronics.controller';

describe('ElectronicsController', () => {
  let controller: ElectronicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectronicsController],
    }).compile();

    controller = module.get<ElectronicsController>(ElectronicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
