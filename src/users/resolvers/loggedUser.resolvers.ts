import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersType } from '../../common/Types/users.types';
import { UpdateUserInput } from '../dto/updateUser.input';
import { loggedUserService } from '../services/loggedUser.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Resolver((of) => UsersType)
export class loggedUserResolver {
  constructor(private loggedUserService: loggedUserService) {}

  @Query((returns) => UsersType)
  findMyData(@Context() context) {
    return this.loggedUserService.findMyData(context);
  }

  @Mutation((returns) => String)
  deleteMe(@Context() context) {
    return this.loggedUserService.deleteMe(context);
  }

  @Mutation((returns) => UsersType)
  updateMe(
    @Context() context,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.loggedUserService.updateMe(context, updateUserInput);
  }

  @Mutation((returns) => String)
  changeMyPassword(
    @Context() context,
    @Args('newPassword') newPassword: string,
  ) {
    return this.loggedUserService.changeMyPassword(context, newPassword);
  }
}
