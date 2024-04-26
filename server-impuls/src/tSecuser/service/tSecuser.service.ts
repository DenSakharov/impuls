import { Injectable, Inject } from '@nestjs/common';
import { tSecuser } from '#/tSecuser/entity/tSecuser';

@Injectable()
export class tSecuserService {
  constructor(
    @Inject('SECUSER_REPOSITORY')
    private tSecuserRepository: typeof tSecuser
  ) {}

  async findAll(): Promise<tSecuser[]> {
    return this.tSecuserRepository.findAll<tSecuser>();
  }
}