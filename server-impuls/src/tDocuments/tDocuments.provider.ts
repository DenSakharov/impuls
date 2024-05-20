import { tDocuments } from '#/tDocuments/tDocuments';

export const tDocumentsProviders = [
  {
    provide: 'DOCUMENTS_REPOSITORY',
    useValue: tDocuments,
  },
];