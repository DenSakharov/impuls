import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { tDocuments } from '#/tDocuments/tDocuments';
import { TMessage } from '#/entities/Message';
import { tChangehistoryService } from '#/tHistory/tChangehistory.service';
import { UUID } from 'crypto';

@Injectable()
export class tDocumentsService {
  constructor(
    @Inject('DOCUMENTS_REPOSITORY')
    private tDocumentsRepository: typeof tDocuments,
    private readonly HistoryService: tChangehistoryService,
  ) {}

  async create(newDocument: Partial<tDocuments>, author: string): Promise<TMessage> {
    if(!newDocument.docname){
      this.HistoryService.create({
        author,
        notes: 'document name is missing',
        logtype: 'Error',
        modules: 'Documents',
        actions: 'Error:Create new document',
      });
      return { error: 'Document name is missing', status: HttpStatus.BAD_REQUEST };
    }
    const documentUUID = crypto.randomUUID();
    try {
      await this.tDocumentsRepository.create({
        docId: documentUUID as `${string}-${string}-${string}-${string}-${string}`,
        docname: newDocument.docname,
        description: newDocument.description,
        objectId: newDocument.objectId,
        author: author,
        dateCreated: new Date(),
      });

      this.HistoryService.create({
        author,
        notes: 'new document was created',
        objectId: documentUUID,
        logtype: 'OK',
        modules: 'Documents',
        actions: 'OK:Create new document',
      });

      return {
        message: `new document created uuid = ${documentUUID} `,
        status: HttpStatus.CREATED,
        uuid: documentUUID,
      };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        this.HistoryService.create({
          author,
          notes: 'document UUID already exists',
          objectId: documentUUID,
          logtype: 'Error',
          modules: 'Documents',
          actions: 'Error:Create new document',
        });
        return {
          error: 'This UUID already exists',
          status: HttpStatus.CONFLICT,
        };
      } else {
        this.HistoryService.create({
          author,
          notes: 'document UUID already exists',
          objectId: documentUUID,
          logtype: 'Error',
          modules: 'Documents',
          actions: 'Error:Create new document',
        });
        return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
    }
  }

  async findAll(): Promise<tDocuments[]> {
    return this.tDocumentsRepository.findAll<tDocuments>();
  }

  async findOne(objectId: string): Promise<tDocuments | undefined> {
    return this.tDocumentsRepository.findOne<tDocuments>({
      where: { docId: objectId },
    });
  }

  async update(objectId: string, newDocument: Partial<tDocuments>, author: string): Promise<tDocuments> {
    const document = await this.findOne(objectId);
    newDocument.dateEdited = new Date();
    this.HistoryService.create({
      author,
      notes: 'document was edited',
      objectId: objectId as UUID,
      logtype: 'OK',
      modules: 'Documents',
      actions: 'OK:Edit document',
    });
    return document.update(newDocument);
  }

  async delete(objectId: string, author: string): Promise<TMessage> {
    try {
      const document = await this.findOne(objectId);

      if (!document) {
        this.HistoryService.create({
          author,
          notes: 'document not found',
          objectId: objectId as UUID,
          logtype: 'Error',
          modules: 'Documents',
          actions: 'Error:Delete document',
        });
        return { error: 'Document not found', status: HttpStatus.NOT_FOUND };
      }

      await document.destroy();
      this.HistoryService.create({
        author,
        notes: 'document was deleted',
        objectId: objectId as UUID,
        logtype: 'OK',
        modules: 'Documents',
        actions: 'OK:Delete document',
      });
      return {
        message: `deleted document uuid = ${objectId}`,
        status: HttpStatus.OK,
        uuid: objectId,
      };
    } catch (error) {
      this.HistoryService.create({
        author,
        notes: 'document not found',
        objectId: objectId as UUID,
        logtype: 'Error',
        modules: 'Documents',
        actions: 'Error:Delete document',
      });
      return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
