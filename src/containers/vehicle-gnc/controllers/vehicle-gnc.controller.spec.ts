import { Test, TestingModule } from '@nestjs/testing';
import { VehicleGncController } from './vehicle-gnc.controller';

describe('VehicleGncController', () => {
  let controller: VehicleGncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleGncController],
    }).compile();

    controller = module.get<VehicleGncController>(VehicleGncController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
