import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { tObject } from './tObject';
import { TMessage } from '#/entities/Message';
import { UUID } from 'crypto';

@Injectable()
export class tObjectService {
  constructor(
    @Inject('OBJECTS_REPOSITORY')
    private tObjectsRepository: typeof tObject,
  ) {}

  async create(
    projectId: string,
    newObject: Partial<tObject>,
  ): Promise<TMessage> {
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
      return {
        message: `new object was created uuid = ${objectUUID} `,
        status: HttpStatus.CREATED,
        uuid: objectUUID,
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

  async update(
    projectId: string,
    newObject: Partial<tObject>,
  ): Promise<tObject>;
  async update(
    projectId: string,
    newObject: Partial<tObject>,
    uuid: string,
  ): Promise<tObject>;
  async update(
    projectId: string,
    newObject: Partial<tObject>,
    uuid?: string,
  ): Promise<tObject> {
    const object = await this.findOne(projectId, uuid ?? newObject.objectId);
    newObject.dateEdited = new Date();
    return object.update(newObject);
  }

  async delete(projectId: string, objectId: string): Promise<TMessage> {
    try {
      const object = await this.findOne(projectId, objectId);

      if (!object) {
        return { error: 'Object not found', status: HttpStatus.NOT_FOUND };
      }

      object.destroy();
      return {
        message: `deleted object uuid = ${objectId}`,
        status: HttpStatus.NO_CONTENT,
        uuid: objectId,
      };
    } catch (error) {
      return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
