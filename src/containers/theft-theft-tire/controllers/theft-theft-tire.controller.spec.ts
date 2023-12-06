import { Test, TestingModule } from '@nestjs/testing';
import { TheftTheftTireController } from './theft-theft-tire.controller';

describe('TheftTheftTireController', () => {
  let controller: TheftTheftTireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TheftTheftTireController],
    }).compile();

    controller = module.get<TheftTheftTireController>(TheftTheftTireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
