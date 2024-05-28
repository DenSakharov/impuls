import { tChangehistory } from '#/tHistory/tChangehistory';

export const tChangehistoryProviders = [
  {
    provide: 'HISTORY_REPOSITORY',
    useValue: tChangehistory,
  },
];