import { Test, TestingModule } from '@nestjs/testing';
import { ThirdPartyVehicleController } from './third-party-vehicle.controller';

describe('ThirdPartyVehicleController', () => {
  let controller: ThirdPartyVehicleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThirdPartyVehicleController],
    }).compile();

    controller = module.get<ThirdPartyVehicleController>(ThirdPartyVehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
