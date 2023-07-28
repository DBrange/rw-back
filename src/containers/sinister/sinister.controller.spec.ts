import { Test, TestingModule } from '@nestjs/testing';
import { SinisterController } from './sinister.controller';

describe('SinisterController', () => {
  let controller: SinisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SinisterController],
    }).compile();

    controller = module.get<SinisterController>(SinisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
