import { Test, TestingModule } from '@nestjs/testing';
import { NewCarDataController } from './new-car-data.controller';

describe('NewCarDataController', () => {
  let controller: NewCarDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewCarDataController],
    }).compile();

    controller = module.get<NewCarDataController>(NewCarDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
