import { Module } from '@nestjs/common';
import { TSecuserController } from '#/tSecuser/t-secuser.controller';
import { tSecuserService } from '#/tSecuser/service/tSecuser.service';
import { tSecUserProviders } from '#/tSecuser/provider/tSecuser.provider';

@Module({
  imports: [],
  controllers: [TSecuserController],
  providers: [
    tSecuserService,
    ...tSecUserProviders,
  ],
})
export class tSecuserModule {}