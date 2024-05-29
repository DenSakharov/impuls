import { Module } from '@nestjs/common';
import { tDocumentsController } from '#/tDocuments/tDocuments.controller';
import { tDocumentsService } from '#/tDocuments/tDocuments.service';
import { tDocumentsProviders } from '#/tDocuments/tDocuments.provider';
import { tChangehistoryModule } from '#/tHistory/tChangehistory.module';

@Module({
  imports: [tChangehistoryModule],
  controllers: [tDocumentsController],
  providers: [tDocumentsService, ...tDocumentsProviders],
})
export class tDocumentsModule {}
