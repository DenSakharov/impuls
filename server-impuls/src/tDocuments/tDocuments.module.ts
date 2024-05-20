import { Module } from '@nestjs/common';
import { tDocumentsController } from '#/tDocuments/tDocuments.controller';
import { tDocumentsService } from '#/tDocuments/tDocuments.service';
import { tDocumentsProviders } from '#/tDocuments/tDocuments.provider';

@Module({
  imports: [],
  controllers: [tDocumentsController],
  providers: [
    tDocumentsService,
    ...tDocumentsProviders,
  ],
})
export class tDocumentsModule {}