import { Test, TestingModule } from '@nestjs/testing';
import { LegalUsersController } from './legal-users.controller';

describe('LegalUsersController', () => {
  let controller: LegalUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegalUsersController],
    }).compile();

    controller = module.get<LegalUsersController>(LegalUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
