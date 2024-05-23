import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { tProject } from './tProject';
import { TMessage } from '#/entities/Message';

@Injectable()
export class tProjectService {
  constructor(
    @Inject('PROJECTS_REPOSITORY')
    private tProjectRepository: typeof tProject,
  ) {}

  async create(newProject: Partial<tProject>): Promise<TMessage> {
    const projectUUID = crypto.randomUUID();
    try {
      await this.tProjectRepository.create({
        projectId: projectUUID,
        name: newProject.name,
        notes: newProject.notes,
        status: newProject.status,
        imsGuid: newProject.imsGuid,
      });
      return {
        message: `new project was created uuid = ${projectUUID} `,
        status: HttpStatus.CREATED,
        uuid: projectUUID,
      };
    } catch (error) {
      console.log(error);

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

  async findAll() {
    return this.tProjectRepository.findAll<tProject>();
  }

  async findOne(projectId: string) {
    return this.tProjectRepository.findOne({
      where: { projectId: projectId },
    });
  }

  async update(newProject: Partial<tProject>): Promise<tProject>;
  async update(newProject: Partial<tProject>, uuid: string): Promise<tProject>;
  async update(
    newProject: Partial<tProject>,
    uuid?: string,
  ): Promise<tProject> {
    const project = await this.findOne(uuid ?? newProject.projectId);
    newProject.dateEdited = new Date();
    return project.update({ uuid } && newProject);
  }
  async delete(projectId: string): Promise<TMessage> {
    try {
      const project = await this.findOne(projectId);

      if (!project) {
        return { error: 'Project not found', status: HttpStatus.NOT_FOUND };
      }

      project.destroy();
      return {
        message: `deleted project uuid = ${projectId}`,
        status: HttpStatus.OK,
        uuid: projectId,
      };
    } catch (error) {
      return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
