import { Test, TestingModule } from '@nestjs/testing';
import { ThirdPartyDriverController } from './third-party-driver.controller';

describe('ThirdPartyDriverController', () => {
  let controller: ThirdPartyDriverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThirdPartyDriverController],
    }).compile();

    controller = module.get<ThirdPartyDriverController>(ThirdPartyDriverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
