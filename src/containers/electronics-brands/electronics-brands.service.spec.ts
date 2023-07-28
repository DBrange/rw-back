import { Test, TestingModule } from '@nestjs/testing';
import { ElectronicsBrandsService } from './electronics-brands.service';

describe('ElectronicsBrandsService', () => {
  let service: ElectronicsBrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectronicsBrandsService],
    }).compile();

    service = module.get<ElectronicsBrandsService>(ElectronicsBrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
