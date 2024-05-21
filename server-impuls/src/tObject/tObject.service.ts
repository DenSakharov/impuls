import { Injectable, Inject } from '@nestjs/common';
import { tObject } from './tObject';
import { IMessage } from '#/entities/Message';
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
  ): Promise<IMessage> {
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
      return { message: `new object was created uuid = ${objectUUID} ` };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { error: 'This UUID already exists' };
      } else {
        return { error: error.name };
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

  async delete(projectId: string, objectId: string): Promise<IMessage> {
    try {
      const object = await this.findOne(projectId, objectId);

      if (!object) {
        throw new Error('Object not found');
      }

      object.destroy();
      return { message: `deleted object uuid = ${objectId}` };
    } catch (error) {
      return { error: error.name };
    }
  }
}
