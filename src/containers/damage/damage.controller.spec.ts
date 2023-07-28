import { Test, TestingModule } from '@nestjs/testing';
import { DamageController } from './damage.controller';

describe('DamageController', () => {
  let controller: DamageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DamageController],
    }).compile();

    controller = module.get<DamageController>(DamageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
