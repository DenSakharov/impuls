import { Module } from '@nestjs/common';
import { tProjectController } from './tProject.controller';
import { tProjectService } from './tProject.service';
import { tProjectProviders } from './tProject.provider';
import { tChangehistoryModule } from '#/tHistory/tChangehistory.module';

@Module({
  imports: [tChangehistoryModule],
  controllers: [tProjectController],
  providers: [tProjectService, ...tProjectProviders],
})
export class tProjectModule {}
