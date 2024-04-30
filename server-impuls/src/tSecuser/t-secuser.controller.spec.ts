import { Test, TestingModule } from '@nestjs/testing';
import { TSecuserController } from './t-secuser.controller';

describe('TSecuserController', () => {
  let controller: TSecuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TSecuserController],
    }).compile();

    controller = module.get<TSecuserController>(TSecuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
