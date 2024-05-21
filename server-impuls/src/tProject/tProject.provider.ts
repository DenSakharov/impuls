import { tProject } from './tProject';

export const tProjectProviders = [
  {
    provide: 'PROJECTS_REPOSITORY',
    useValue: tProject,
  },
];
