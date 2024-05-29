import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { tObject } from './tObject';
import { TMessage } from '#/entities/Message';
import { UUID } from 'crypto';
import { tChangehistoryService } from '#/tHistory/tChangehistory.service';

@Injectable()
export class tObjectService {
  constructor(
    @Inject('OBJECTS_REPOSITORY')
    private tObjectsRepository: typeof tObject,
    private readonly HistoryService: tChangehistoryService,
  ) {}

  async create(projectId: string, newObject: Partial<tObject>, author: string): Promise<TMessage> {
    const objectUUID = crypto.randomUUID();
    try {
      await this.tObjectsRepository.create({
        objectId: objectUUID,
        objectType: newObject.objectType,
        name: newObject.name,
        alias: newObject.alias,
        author: newObject.author,
        version: newObject.version,
        note: newObject.note,
        packageId: newObject.packageId,
        stereotype: newObject.stereotype,
        status: newObject.status,
        imsGuid: newObject.imsGuid,
        propertyId: newObject.propertyId,
        connectorId: newObject.connectorId,
        filename: newObject.filename,
        appliesto: newObject.appliesto,
        projectId: projectId as UUID,
        dateCreated: new Date(),
      });
      this.HistoryService.create({
        author,
        notes: 'new object was created',
        objectId: objectUUID,
        logtype: 'OK',
        modules: 'Objects',
        actions: 'OK:Create new object',
      });
      return {
        message: `new object was created uuid = ${objectUUID} `,
        status: HttpStatus.CREATED,
        uuid: objectUUID,
      };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        this.HistoryService.create({
          author,
          notes: 'object UUID already exists',
          objectId: objectUUID,
          logtype: 'Error',
          modules: 'Objects',
          actions: 'Error:Create new object',
        });
        return {
          error: 'This UUID already exists',
          status: HttpStatus.CONFLICT,
        };
      } else {
        this.HistoryService.create({
          author,
          notes: 'internal server error',
          objectId: objectUUID,
          logtype: 'Error',
          modules: 'Objects',
          actions: 'Error:Create new object',
        });
        return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
    }
  }

  async findAll(projectId: string) {
    return this.tObjectsRepository.findAll<tObject>({
      where: { projectId: projectId },
    });
  }

  async findOne(projectId: string, objectId: string) {
    return this.tObjectsRepository.findOne({
      where: { projectId: projectId, objectId: objectId },
    });
  }

  async update(projectId: string, newObject: Partial<tObject>, author: string): Promise<tObject>;
  async update(projectId: string, newObject: Partial<tObject>, author: string, uuid: string): Promise<tObject>;
  async update(projectId: string, newObject: Partial<tObject>, author: string, uuid?: string): Promise<tObject> {
    const object = await this.findOne(projectId, uuid ?? newObject.objectId);
    newObject.dateEdited = new Date();
    this.HistoryService.create({
      author,
      notes: 'object was updated',
      objectId: object.objectId,
      logtype: 'OK',
      modules: 'Objects',
      actions: 'OK:Update object',
    });
    return object.update(newObject);
  }

  async delete(projectId: string, objectId: string, author: string): Promise<TMessage> {
    try {
      const object = await this.findOne(projectId, objectId);

      if (!object) {
        this.HistoryService.create({
          author,
          notes: 'object not found',
          objectId: objectId as UUID,
          logtype: 'Error',
          modules: 'Objects',
          actions: 'Error:Delete object',
        });
        return { error: 'Object not found', status: HttpStatus.NOT_FOUND };
      }

      object.destroy();
      this.HistoryService.create({
        author,
        notes: 'object was deleted',
        objectId: objectId as UUID,
        logtype: 'OK',
        modules: 'Objects',
        actions: 'OK:Delete object',
      });
      return {
        message: `deleted object uuid = ${objectId}`,
        status: HttpStatus.OK,
        uuid: objectId,
      };
    } catch (error) {
      this.HistoryService.create({
        author,
        notes: 'internal server error',
        objectId: objectId as UUID,
        logtype: 'Error',
        modules: 'Objects',
        actions: 'Error:Delete object',
      });
      return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
