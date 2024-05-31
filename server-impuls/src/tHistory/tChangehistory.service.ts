import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { tChangehistory } from '#/tHistory/tChangehistory';
import { TMessage } from '#/entities/Message';
import { log } from 'console';

@Injectable()
export class tChangehistoryService {
  constructor(
    @Inject('HISTORY_REPOSITORY')
    private tChangehistoryRepository: typeof tChangehistory,
  ) {}

  async create(newDocument: Partial<tChangehistory>): Promise<TMessage> {
    const documentUUID = crypto.randomUUID();
    try {
      await this.tChangehistoryRepository.create({
        logId: documentUUID,
        datetime: new Date(),
        author: newDocument.author,
        notes: newDocument.notes,
        objectId: newDocument.objectId,
        logtype: newDocument.logtype,
        modules:newDocument.modules,
        actions:newDocument.actions,
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

  async findAll(): Promise<tChangehistory[]> {
    return this.tChangehistoryRepository.findAll<tChangehistory>();
  }

  async findOne(objectId: string): Promise<tChangehistory | undefined> {
    return this.tChangehistoryRepository.findOne<tChangehistory>({
      where: { logId: objectId },
    });
  }

  async update(
    objectId: string,
    newDocument: Partial<tChangehistory>,
  ): Promise<tChangehistory> {
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

      await document.destroy();
      return {
        message: `deleted document uuid = ${objectId}`,
        status: HttpStatus.OK,
        uuid: objectId,
      };
    } catch (error) {
      return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
