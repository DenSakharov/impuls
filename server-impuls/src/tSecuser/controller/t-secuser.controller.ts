import { Controller, Get } from '@nestjs/common';
import { tSecuserService } from '#/tSecuser/service/tSecuser.service';
import { tSecuser } from '#/tSecuser/entity/tSecuser';

@Controller('/users')
export class TSecuserController {
  constructor(private readonly tSecuserService: tSecuserService) {}

  @Get('/all')
  findAll(): Promise<tSecuser[]>  {
    return this.tSecuserService.findAll();
  }
}
