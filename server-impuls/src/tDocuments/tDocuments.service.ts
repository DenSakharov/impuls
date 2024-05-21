import { Injectable, Inject } from '@nestjs/common';
import { tDocuments } from '#/tDocuments/tDocuments';
import { IMessage } from '#/entities/Message';

@Injectable()
export class tDocumentsService {
  constructor(
    @Inject('DOCUMENTS_REPOSITORY')
    private tDocumentsRepository: typeof tDocuments,
  ) {}

  async create(newDocument: Partial<tDocuments>): Promise<IMessage> {
    const documentUUID = crypto.randomUUID();
    try {
      await this.tDocumentsRepository.create({
        docId: documentUUID,
        docname: newDocument.docname,
        description: newDocument.description,
        objectId: newDocument.objectId,
        dateCreated: new Date(),
      });
      return { message: `new document created uuid = ${documentUUID} ` };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { error: 'This UUID already exists' };
      } else {
        return { error: error.name };
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

  async delete(objectId: string): Promise<IMessage> {
    try {
      const document = await this.findOne(objectId);

      if (!document) {
        throw new Error('Document not found');
      }

      document.destroy();
      return { message: `deleted document uuid = ${objectId}` };
    } catch (error) {
      return { error: error.name };
    }
  }
}
