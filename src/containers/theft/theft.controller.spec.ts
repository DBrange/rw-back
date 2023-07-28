import { Test, TestingModule } from '@nestjs/testing';
import { TheftController } from './theft.controller';

describe('TheftController', () => {
  let controller: TheftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TheftController],
    }).compile();

    controller = module.get<TheftController>(TheftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
