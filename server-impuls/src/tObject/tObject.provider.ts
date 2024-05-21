import { tObject } from './tObject';

export const tObjectProviders = [
  {
    provide: 'OBJECTS_REPOSITORY',
    useValue: tObject,
  },
];
