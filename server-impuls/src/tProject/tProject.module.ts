import { Module } from '@nestjs/common';
import { tProjectController } from './tProject.controller';
import { tProjectService } from './tProject.service';
import { tProjectProviders } from './tProject.provider';

@Module({
  imports: [],
  controllers: [tProjectController],
  providers: [tProjectService, ...tProjectProviders],
})
export class tProjectModule {}
