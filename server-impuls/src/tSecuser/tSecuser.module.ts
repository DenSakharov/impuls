import { Module } from '@nestjs/common';
import { TSecuserController } from '#/tSecuser/tSecuser.controller';
import { tSecuserService } from '#/tSecuser/tSecuser.service';
import { tSecUserProviders } from '#/tSecuser/tSecuser.provider';

@Module({
  imports: [],
  controllers: [TSecuserController],
  providers: [
    tSecuserService,
    ...tSecUserProviders,
  ],
})
export class tSecuserModule {}