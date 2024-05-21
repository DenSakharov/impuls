import { Injectable, Inject } from '@nestjs/common';
import { tProject } from './tProject';
import { IMessage } from '#/entities/Message';

@Injectable()
export class tProjectService {
  constructor(
    @Inject('PROJECTS_REPOSITORY')
    private tProjectRepository: typeof tProject,
  ) {}

  async create(newProject: Partial<tProject>): Promise<IMessage> {
    const projectUUID = crypto.randomUUID();
    try {
      await this.tProjectRepository.create({
        projectId: projectUUID,
        name: newProject.name,
        notes: newProject.notes,
        status: newProject.status,
        imsGuid: newProject.imsGuid,
      });
      return { message: `new project was created uuid = ${projectUUID} ` };
    } catch (error) {
      console.log(error);

      if (error.name === 'SequelizeUniqueConstraintError') {
        return { error: 'This UUID already exists' };
      } else {
        return { error: error.name };
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
  async delete(projectId: string): Promise<IMessage> {
    try {
      const project = await this.findOne(projectId);

      if (!project) {
        throw new Error('Project not found');
      }

      project.destroy();
      return { message: `deleted project uuid = ${projectId}` };
    } catch (error) {
      return { error };
    }
  }
}
