import { Module } from '@nestjs/common';
import { tObjectController } from './tObject.controller';
import { tObjectService } from './tObject.service';
import { tObjectProviders } from './tObject.provider';
import { tChangehistoryModule } from '#/tHistory/tChangehistory.module';

@Module({
  imports: [tChangehistoryModule],
  controllers: [tObjectController],
  providers: [tObjectService, ...tObjectProviders],
})
export class tObjectModule {}
