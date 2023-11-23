import { Follow } from '../../follow/tables/follow.table';

export const followProviders = [
  {
    provide: 'FOLLOW_REPOSITORY',
    useValue: Follow,
  },
];
