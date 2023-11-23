import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { SignUpInput } from '../dto/signUp-auth.input';
import { UsersType } from 'src/common/Types/users.types';
import { SignInInput } from '../dto/signIn-auth.input';
import {
  ChangePassword,
  ResetCodeInput,
  SendEmailInput,
} from '../dto/change_password.Input';

@Resolver(() => UsersType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UsersType)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation((returns) => String)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Mutation((returns) => String)
  sendEmail(
    @Args('sendEmailInput')
    sendEmailInput: SendEmailInput,
  ) {
    return this.authService.sendMail(sendEmailInput);
  }

  @Mutation((returns) => String)
  verifyResetCode(@Args('resetCodeInput') resetCodeInput: ResetCodeInput) {
    return this.authService.verifyResetCode(resetCodeInput);
  }

  @Mutation((returns) => String)
  changePassword(@Args('changePassword') changePassword: ChangePassword) {
    return this.authService.changePassword(changePassword);
  }
}
