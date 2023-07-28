import { Test, TestingModule } from '@nestjs/testing';
import { ThirdPartyVehicleService } from './third-party-vehicle.service';

describe('ThirdPartyVehicleService', () => {
  let service: ThirdPartyVehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThirdPartyVehicleService],
    }).compile();

    service = module.get<ThirdPartyVehicleService>(ThirdPartyVehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
