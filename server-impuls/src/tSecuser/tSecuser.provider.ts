import { tSecuser } from '#/tSecuser/tSecuser';

export const tSecUserProviders = [
  {
    provide: 'SECUSER_REPOSITORY',
    useValue: tSecuser,
  },
];