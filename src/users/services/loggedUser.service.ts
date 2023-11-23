import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../tables/users.table';
import { UpdateUserInput } from '../dto/updateUser.input';
import { hash } from 'bcryptjs';

@Injectable()
export class loggedUserService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
  ) {}

  async findMyData(context) {
    const user = context.req.user;
    return user;
  }

  async updateMe(context, updateUserInput: UpdateUserInput) {
    const updatedUser = await this.usersRepository.update(updateUserInput, {
      where: { id: context.req.user.id },
      returning: true,
    });
    if (!updatedUser[0]) {
      throw new NotFoundException('User not found');
    }
    return updatedUser[1][0];
  }

  async deleteMe(context) {
    console.log(context.req.user.id);
    const user = await this.usersRepository.destroy({
      where: { id: context.req.user.id },
    });
    if (!user) {
      throw new NotFoundException(`No user for this id`);
    }
    return 'Success';
  }

  async changeMyPassword(context, newPassword: string) {
    const hashNewPassword = await hash(newPassword, 10);
    const user = await this.usersRepository.update(
      { password: hashNewPassword },
      {
        where: { id: context.req.user.id },
        returning: true,
      },
    );
    if (!user[0]) {
      throw new NotFoundException('User not found');
    }
    return 'Password Success';
  }
}
