import { Module } from '@nestjs/common';
import { tObjectController } from './tObject.controller';
import { tObjectService } from './tObject.service';
import { tObjectProviders } from './tObject.provider';

@Module({
  imports: [],
  controllers: [tObjectController],
  providers: [tObjectService, ...tObjectProviders],
})
export class tObjectModule {}
