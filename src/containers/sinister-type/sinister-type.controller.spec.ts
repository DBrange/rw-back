import { Test, TestingModule } from '@nestjs/testing';
import { SinisterTypeController } from './sinister-type.controller';

describe('SinisterTypeController', () => {
  let controller: SinisterTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SinisterTypeController],
    }).compile();

    controller = module.get<SinisterTypeController>(SinisterTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
