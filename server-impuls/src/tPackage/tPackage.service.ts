import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { TMessage } from '#/entities/Message';
import { tPackage } from './tPackage';
import { UUID } from 'crypto';
import { tObject, tDocuments } from '#/entities';
import { PackagesTree } from '#/entities/PackagesTree';
import { tChangehistoryService } from '#/tHistory/tChangehistory.service';

@Injectable()
export class tPackageService {
  constructor(
    @Inject('PACKAGES_REPOSITORY')
    private tPackageRepository: typeof tPackage,
    @Inject('OBJECTS_REPOSITORY')
    private tObjectsRepository: typeof tObject,
    @Inject('DOCUMENTS_REPOSITORY')
    private tDocumentsRepository: typeof tDocuments,
    private readonly HistoryService: tChangehistoryService,
  ) {}

  async create(projectId: string, newPackage: Partial<tPackage>, author: string): Promise<TMessage> {
    if(!newPackage.name){
      this.HistoryService.create({
        author,
        notes: 'package name is empty',
        logtype: 'Error',
        modules: 'Packages',
        actions: 'Error:Create new package',
      });
      return { error: 'Package name is empty', status: HttpStatus.BAD_REQUEST };
    }
    const packageUUID = crypto.randomUUID();
    try {
      await this.tPackageRepository.create({
        packageId: packageUUID,
        name: newPackage.name,
        parentId: newPackage.parentId,
        imsGuid: newPackage.imsGuid,
        notes: newPackage.notes,
        projectId: projectId as UUID,
      });
      this.HistoryService.create({
        author,
        notes: 'new package was created',
        objectId: packageUUID,
        logtype: 'OK',
        modules: 'Packages',
        actions: 'OK:Create new package',
      });
      return {
        message: `new package was created uuid = ${packageUUID} `,
        status: HttpStatus.CREATED,
        uuid: packageUUID,
      };
    } catch (error) {
      console.log(error);

      if (error.name === 'SequelizeUniqueConstraintError') {
        this.HistoryService.create({
          author,
          notes: 'package UUID already exists',
          objectId: packageUUID,
          logtype: 'Error',
          modules: 'Packages',
          actions: 'Error:Create new package',
        });
        return {
          error: 'This UUID already exists',
          status: HttpStatus.CONFLICT,
        };
      } else {
        this.HistoryService.create({
          author,
          notes: 'internal server error',
          objectId: packageUUID,
          logtype: 'Error',
          modules: 'Packages',
          actions: 'Error:Create new package',
        });
        return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
    }
  }

  async findAll(projectId: string) {
    return this.tPackageRepository.findAll<tPackage>({
      where: { projectId: projectId },
    });
  }

  async findOne(projectId: string, packageId: string) {
    return this.tPackageRepository.findOne({
      where: { projectId: projectId, packageId: packageId },
    });
  }

  async update(projectId: string, newPackage: Partial<tPackage>, author: string): Promise<tPackage>;
  async update(projectId: string, newPackage: Partial<tPackage>, author: string, uuid: string): Promise<tPackage>;
  async update(projectId: string, newPackage: Partial<tPackage>, author: string, uuid?: string): Promise<tPackage> {
    const pack = await this.findOne(projectId, uuid ?? newPackage.projectId);
    this.HistoryService.create({
      author,
      notes: 'package was updated',
      objectId: uuid as UUID,
      logtype: 'OK',
      modules: 'Packages',
      actions: 'OK:Update package',
    });
    return pack.update({ uuid } && newPackage);
  }

  async delete(projectId: string, packageId: string, emptyOnly: boolean, author: string): Promise<TMessage> {
    //TODO: Need to do something if package is not empty

    try {
      const pack = await this.findOne(projectId, packageId);

      if (!pack) {
        this.HistoryService.create({
          author,
          notes: 'package not found',
          objectId: packageId as UUID,
          logtype: 'Error',
          modules: 'Packages',
          actions: 'Error:Delete package',
        });
        return { error: 'Package not found', status: HttpStatus.CONFLICT };
      }
      if (
        !emptyOnly ||
        ((
          await this.tPackageRepository.findAll({
            where: { parentId: packageId },
          })
        ).length === 0 &&
          (
            await this.tObjectsRepository.findAll({
              where: { packageId: packageId },
            })
          ).length === 0)
      ) {
        pack.destroy();
        this.HistoryService.create({
          author,
          notes: 'package was deleted',
          objectId: packageId as UUID,
          logtype: 'OK',
          modules: 'Packages',
          actions: 'OK:Delete package',
        });
        return {
          message: `deleted package uuid = ${packageId}`,
          status: HttpStatus.OK,
          uuid: packageId,
        };
      } else {
        this.HistoryService.create({
          author,
          notes: 'package not empty',
          objectId: packageId as UUID,
          logtype: 'Error',
          modules: 'Packages',
          actions: 'Error:Delete package',
        });
        return { error: 'Package not empty', status: HttpStatus.CONFLICT };
      }
    } catch (error) {
      this.HistoryService.create({
        author,
        notes: 'internal server error',
        objectId: packageId as UUID,
        logtype: 'Error',
        modules: 'Packages',
        actions: 'Error:Delete package',
      });
      return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async children(parentId: string) {
    return this.tPackageRepository.findAll({
      where: { parentId: parentId },
    });
  }
  async objects(packageId: string) {
    //Maybe it is better to move it to object service? But it should be on this URL
    return this.tObjectsRepository.findAll<tObject>({
      where: { packageId: packageId },
    });
  }

  async tree(projectId: string) {
    const packages = await this.tPackageRepository.findAll<tPackage>({
      where: { projectId: projectId },
    });
    const objects = await this.tObjectsRepository.findAll<tObject>({
      where: { projectId: projectId },
    });
    const documents = await this.tDocumentsRepository.findAll<tDocuments>({
      where: { objectId: objects.map((o) => o.objectId) },
    });
    const buildTree = (
      currentPackage: tPackage,
      packages: tPackage[],
      objects: {
        object: tObject;
        documents: tDocuments[];
      }[],
    ): PackagesTree => {
      return {
        packageObject: currentPackage,
        objects: objects
          .filter((o) => o.object.packageId === currentPackage.packageId)
          .map((o) => ({
            object: o.object,
            documents: documents.filter((d) => d.objectId === o.object.objectId),
          })),
        children: packages.filter((p) => p.parentId === currentPackage.packageId).map((p) => buildTree(p, packages, objects)),
      };
    };

    return packages
      .filter((p) => p.parentId === null)
      .map((p) =>
        buildTree(
          p,
          packages,
          objects.map((o) => ({ object: o, documents: documents })),
        ),
      );
  }
}
