import { Test, TestingModule } from '@nestjs/testing';
import { NewCarDataService } from './new-car-data.service';

describe('NewCarDataService', () => {
  let service: NewCarDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewCarDataService],
    }).compile();

    service = module.get<NewCarDataService>(NewCarDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
