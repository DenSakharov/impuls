import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { tDocuments } from '#/tDocuments/tDocuments';
import { TMessage } from '#/entities/Message';

@Injectable()
export class tDocumentsService {
  constructor(
    @Inject('DOCUMENTS_REPOSITORY')
    private tDocumentsRepository: typeof tDocuments,
  ) {}

  async create(newDocument: Partial<tDocuments>): Promise<TMessage> {
    const documentUUID = crypto.randomUUID();
    try {
      await this.tDocumentsRepository.create({
        docId: documentUUID,
        docname: newDocument.docname,
        description: newDocument.description,
        objectId: newDocument.objectId,
        dateCreated: new Date(),
      });
      return {
        message: `new document created uuid = ${documentUUID} `,
        status: HttpStatus.CREATED,
        uuid: documentUUID,
      };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return {
          error: 'This UUID already exists',
          status: HttpStatus.CONFLICT,
        };
      } else {
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

  async update(
    objectId: string,
    newDocument: Partial<tDocuments>,
  ): Promise<tDocuments> {
    const document = await this.findOne(objectId);
    newDocument.dateEdited = new Date();
    return document.update(newDocument);
  }

  async delete(objectId: string): Promise<TMessage> {
    try {
      const document = await this.findOne(objectId);

      if (!document) {
        return { error: 'Document not found', status: HttpStatus.NOT_FOUND };
      }

      document.destroy();
      return {
        message: `deleted document uuid = ${objectId}`,
        status: HttpStatus.NO_CONTENT,
        uuid: objectId,
      };
    } catch (error) {
      return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
