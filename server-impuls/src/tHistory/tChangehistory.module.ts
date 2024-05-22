import { Module } from '@nestjs/common';
import { tChangehistoryController } from '#/tHistory/tChangehistory.controller';
import { tChangehistoryService } from '#/tHistory/tChangehistory.service';
import { tChangehistoryProviders } from '#/tHistory/tChangehistory.provider';

@Module({
  imports: [],
  controllers: [tChangehistoryController],
  providers: [
    tChangehistoryService,
    ...tChangehistoryProviders,
  ],
})
export class tChangehistoryModule {}