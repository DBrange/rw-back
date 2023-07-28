import { Test, TestingModule } from '@nestjs/testing';
import { ElectronicsBrandsController } from './electronics-brands.controller';

describe('ElectronicsBrandsController', () => {
  let controller: ElectronicsBrandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectronicsBrandsController],
    }).compile();

    controller = module.get<ElectronicsBrandsController>(ElectronicsBrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
