import { tObject, tDocuments } from '#/entities';
import { tPackage } from './tPackage';

export const tPackageProviders = [
  {
    provide: 'PACKAGES_REPOSITORY',
    useValue: tPackage,
  },
  {
    provide: 'OBJECTS_REPOSITORY',
    useValue: tObject,
  },
  {
    provide: 'DOCUMENTS_REPOSITORY',
    useValue: tDocuments,
  },
];
