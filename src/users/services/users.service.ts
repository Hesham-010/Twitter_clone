import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../tables/users.table';
import { CreateUserInput } from '../dto/createUser.input';
import { v4 as uuid } from 'uuid';
import { UpdateUserInput } from '../dto/updateUser.input';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
  ) {}

  async findAll(page: number, limit: number) {
    return await Users.paginate(page, limit);
  }

  async createUser(createUserInput: CreateUserInput) {
    const hashPassword = await hash(createUserInput.password, 10);
    createUserInput.password = hashPassword;
    const user = await this.usersRepository.create({
      id: uuid(),
      ...createUserInput,
    });
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.destroy({ where: { id } });
    if (!user) {
      throw new NotFoundException(`No user for this id ${id}`);
    }
    return 'Success';
  }

  async findUserById(id: string) {
    const user = await this.usersRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`No User for this id ${id}`);
    }
    return user;
  }

  async findUserByName(name: string) {
    const user = await this.usersRepository.findOne({ where: { name } });
    if (!user) {
      throw new NotFoundException(`No User for this name ${name}`);
    }
    return user;
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput) {
    const updatedUser = await this.usersRepository.update(updateUserInput, {
      where: { id },
      returning: true,
    });
    if (!updatedUser[0]) {
      throw new NotFoundException('User not found');
    }
    return updatedUser[1][0];
  }

  async changeUserPassword(id: string, newPassword: string) {
    const hashNewPassword = await hash(newPassword, 10);
    const user = await this.usersRepository.update(
      { password: hashNewPassword },
      {
        where: { id },
        returning: true,
      },
    );
    if (!user[0]) {
      throw new NotFoundException('User not found');
    }
    return 'Password Updated';
  }
}
