import { tSecuser } from '#/tSecuser/entity/tSecuser';

export const tSecUserProviders = [
  {
    provide: 'SECUSER_REPOSITORY',
    useValue: tSecuser,
  },
];