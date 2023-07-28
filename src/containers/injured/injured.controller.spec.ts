import { Test, TestingModule } from '@nestjs/testing';
import { InjuredController } from './injured.controller';

describe('InjuredController', () => {
  let controller: InjuredController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InjuredController],
    }).compile();

    controller = module.get<InjuredController>(InjuredController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
