import { Test, TestingModule } from '@nestjs/testing';
import { UserBrokerController } from './user-broker.controller';

describe('UserBrokerController', () => {
  let controller: UserBrokerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBrokerController],
    }).compile();

    controller = module.get<UserBrokerController>(UserBrokerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
