import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { tProject } from './tProject';
import { TMessage } from '#/entities/Message';
import { tChangehistoryService } from '#/tHistory/tChangehistory.service';
import { UUID } from 'crypto';

@Injectable()
export class tProjectService {
  constructor(
    @Inject('PROJECTS_REPOSITORY')
    private tProjectRepository: typeof tProject,

    private readonly HistoryService: tChangehistoryService,
  ) {}

  async create(newProject: Partial<tProject>, author: string): Promise<TMessage> {
    if(!newProject.name){
      this.HistoryService.create({
        author,
        notes: 'project name is empty',
        logtype: 'Error',
        modules: 'Projects',
        actions: 'Error:Create new project',
      });
      return { error: 'Project name is empty', status: HttpStatus.BAD_REQUEST };
    }
    const projectUUID = crypto.randomUUID();
    try {
      await this.tProjectRepository.create({
        projectId: projectUUID,
        name: newProject.name,
        notes: newProject.notes,
        status: newProject.status,
        imsGuid: newProject.imsGuid,
      });
      this.HistoryService.create({
        author,
        notes: 'new project was created',
        objectId: projectUUID,
        logtype: 'OK',
        modules: 'Projects',
        actions: 'OK:Create new project',
      });
      return {
        message: `new project was created uuid = ${projectUUID} `,
        status: HttpStatus.CREATED,
        uuid: projectUUID,
      };
    } catch (error) {
      console.log(error);

      if (error.name === 'SequelizeUniqueConstraintError') {
        this.HistoryService.create({
          author,
          notes: 'project UUID already exists',
          objectId: projectUUID,
          logtype: 'Error',
          modules: 'Projects',
          actions: 'Error:Create new project',
        });
        return {
          error: 'This UUID already exists',
          status: HttpStatus.CONFLICT,
        };
      } else {
        return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
    }
  }

  async findAll() {
    return this.tProjectRepository.findAll<tProject>();
  }

  async findOne(projectId: string) {
    return this.tProjectRepository.findOne({
      where: { projectId: projectId },
    });
  }

  async update(newProject: Partial<tProject>, author: string): Promise<tProject>;
  async update(newProject: Partial<tProject>, author: string, uuid: string): Promise<tProject>;
  async update(newProject: Partial<tProject>, author: string, uuid?: string): Promise<tProject> {
    const project = await this.findOne(uuid ?? newProject.projectId);
    newProject.dateEdited = new Date();
    this.HistoryService.create({
      author,
      notes: 'project was updated',
      objectId: (uuid ?? newProject.projectId) as UUID,
      logtype: 'OK',
      modules: 'Projects',
      actions: 'OK:Update project',
    });
    return project.update({ uuid } && newProject);
  }
  async delete(projectId: string, author: string): Promise<TMessage> {
    try {
      const project = await this.findOne(projectId);

      if (!project) {
        this.HistoryService.create({
          author,
          notes: 'project not found',
          objectId: projectId as UUID,
          logtype: 'Error',
          modules: 'Projects',
          actions: 'Error:Delete project',
        });
        return { error: 'Project not found', status: HttpStatus.NOT_FOUND };
      }

      project.destroy();
      this.HistoryService.create({
        author,
        notes: 'project was deleted',
        objectId: projectId as UUID,
        logtype: 'OK',
        modules: 'Projects',
        actions: 'OK:Delete project',
      });
      return {
        message: `deleted project uuid = ${projectId}`,
        status: HttpStatus.OK,
        uuid: projectId,
      };
    } catch (error) {
      this.HistoryService.create({
        author,
        notes: 'project not found',
        objectId: projectId as UUID,
        logtype: 'Error',
        modules: 'Projects',
        actions: 'Error:Delete project',
      });
      return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
