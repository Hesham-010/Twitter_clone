import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersType } from '../../common/Types/users.types';
import { UsersService } from '../services/users.service';
import { CreateUserInput } from '../dto/createUser.input';
import { UpdateUserInput } from '../dto/updateUser.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/utils/enum_roles';
import { UsersPaginationType } from 'src/common/Types/pagination.type';

@UseGuards(AuthGuard, RolesGuard)
@Resolver((of) => UsersType)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Roles(Role.Admin)
  @Query((returns) => UsersPaginationType)
  findAllUsers(@Args('page') page: number, @Args('limit') limit: number) {
    return this.usersService.findAll(page, limit);
  }

  @Query((returns) => UsersType)
  findUserById(@Args('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Query((returns) => UsersType)
  findUserByName(@Args('name') name: string) {
    return this.usersService.findUserByName(name);
  }

  @Roles(Role.Admin)
  @Mutation((returns) => UsersType)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Roles(Role.Admin)
  @Mutation((returns) => String)
  deleteUser(@Args('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Roles(Role.Admin)
  @Mutation((returns) => UsersType)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Roles(Role.Admin)
  @Mutation((returns) => String)
  changeUserPassword(
    @Args('id') id: string,
    @Args('newPassword') newPassword: string,
  ) {
    return this.usersService.changeUserPassword(id, newPassword);
  }
}
