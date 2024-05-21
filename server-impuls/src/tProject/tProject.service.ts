import { Injectable, Inject } from '@nestjs/common';
import { tProject } from '#/tProject/tProject';

@Injectable()
export class tProjectService {
  constructor(
    @Inject('PROJECTS_REPOSITORY')
    private tProjectRepository: typeof tProject,
  ) {}

  async create(newProject: Partial<tProject>): Promise<string> {
    const projectUUID = crypto.randomUUID();
    try {
      await this.tProjectRepository.create({
        ...newProject,
        projectId: projectUUID,
        dateCreated: new Date(),
      });
      return `new project was created uuid = ${projectUUID} `;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return 'This UUID already exists';
      } else {
        return error;
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

  async update(newProject: Partial<tProject>) {
    const project = await this.findOne(newProject.projectId);
    newProject.dateEdited = new Date();
    return project.update(newProject);
  }

  async delete(projectId: string): Promise<string> {
    try {
      const project = await this.findOne(projectId);

      if (!project) {
        throw new Error('Document not found');
      }

      project.destroy();
      return `deleted document uuid = ${projectId}`;
    } catch (error) {
      return error;
    }
  }
}
