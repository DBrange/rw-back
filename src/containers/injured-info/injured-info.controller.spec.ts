import { Test, TestingModule } from '@nestjs/testing';
import { InjuredInfoController } from './injured-info.controller';

describe('InjuredInfoController', () => {
  let controller: InjuredInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InjuredInfoController],
    }).compile();

    controller = module.get<InjuredInfoController>(InjuredInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
