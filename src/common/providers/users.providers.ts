import { Users } from '../../users/tables/users.table';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];
