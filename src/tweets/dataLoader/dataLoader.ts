import { Inject, Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Users } from 'src/users/tables/users.table';

@Injectable({ scope: Scope.REQUEST })
export class UserDataLoader {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
  ) {}

  userLoader = new DataLoader(async (userIds) => {
    const users = await this.usersRepository.findAll({
      where: { id: userIds },
    });

    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = user;
    });
    console.log(userMap);
    return userIds.map((userId: any) => userMap[userId]);
  });
}
