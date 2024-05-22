import { tProject } from './tProject';
import { tProjectController } from './tProject.controller';
import { tProjectService } from './tProject.service';

describe('ProjectController', () => {
  let projectController: tProjectController;
  let projectService: tProjectService;

  beforeEach(() => {
    projectService = new tProjectService(tProject);
    projectController = new tProjectController(projectService);
  });

  describe('findAll', () => {
    it('should return an array of objects', async () => {
      const result: tProject[] = [];
      jest
        .spyOn(projectService, 'findAll')
        .mockImplementation(async () => result);

      expect(await projectController.findAll()).toBe(result);
    });
  });
});
