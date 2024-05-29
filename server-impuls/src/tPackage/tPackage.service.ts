import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { TMessage } from '#/entities/Message';
import { tPackage } from './tPackage';
import { UUID } from 'crypto';
import { tObject } from '#/entities';
import { PackagesTree } from '#/entities/PackagesTree';
import { tChangehistoryService } from '#/tHistory/tChangehistory.service';

@Injectable()
export class tPackageService {
  constructor(
    @Inject('PACKAGES_REPOSITORY')
    private tPackageRepository: typeof tPackage,
    @Inject('OBJECTS_REPOSITORY')
    private tObjectsRepository: typeof tObject,
    private readonly HistoryService: tChangehistoryService,
  ) {}

  async create(projectId: string, newPackage: Partial<tPackage>, author: string): Promise<TMessage> {
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
        //objectId: packageUUID,
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
          //objectId: packageUUID,
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
          //objectId: packageUUID,
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

  async update(projectId: string, newPackage: Partial<tPackage>): Promise<tPackage>;
  async update(projectId: string, newPackage: Partial<tPackage>, uuid: string): Promise<tPackage>;
  async update(projectId: string, newPackage: Partial<tPackage>, uuid?: string): Promise<tPackage> {
    const pack = await this.findOne(projectId, uuid ?? newPackage.projectId);
    return pack.update({ uuid } && newPackage);
  }

  async delete(projectId: string, packageId: string, emptyOnly: boolean): Promise<TMessage> {
    //TODO: Need to do something if package is not empty

    try {
      const pack = await this.findOne(projectId, packageId);

      if (!pack) {
        throw new Error('Package not found');
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
        return {
          message: `deleted package uuid = ${packageId}`,
          status: HttpStatus.OK,
          uuid: packageId,
        };
      } else {
        return { error: 'Package not empty', status: HttpStatus.CONFLICT };
      }
    } catch (error) {
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

    const buildTree = (currentPackage: tPackage, packages: tPackage[], objects: tObject[]): PackagesTree => {
      return {
        packageObject: currentPackage,
        objects: objects.filter((o) => o.packageId === currentPackage.packageId),
        children: packages.filter((p) => p.parentId === currentPackage.packageId).map((p) => buildTree(p, packages, objects)),
      };
    };

    return packages.filter((p) => p.parentId === null).map((p) => buildTree(p, packages, objects));
  }
}
