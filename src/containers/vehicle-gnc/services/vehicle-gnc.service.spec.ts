import { Test, TestingModule } from '@nestjs/testing';
import { VehicleGncService } from './vehicle-gnc.service';

describe('VehicleGncService', () => {
  let service: VehicleGncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleGncService],
    }).compile();

    service = module.get<VehicleGncService>(VehicleGncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
