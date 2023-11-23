import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInInput } from '../dto/signIn-auth.input';
import { CreateToken } from 'src/utils/createToken';
import { SignUpInput } from '../dto/signUp-auth.input';
import { Users } from 'src/users/tables/users.table';
import { hash, compare } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { sendEmail } from 'src/utils/sendEmail';
import { createHash } from 'crypto';
import {
  ChangePassword,
  ResetCodeInput,
  SendEmailInput,
} from '../dto/change_password.Input';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const user = await this.usersRepository.findOne({
      where: { email: signUpInput.email },
    });
    if (user) {
      throw new BadRequestException('This Email already exist');
    }
    const hashPassword = await hash(signUpInput.password, 10);
    signUpInput.password = hashPassword;
    const newUser = await this.usersRepository.create({
      id: uuid(),
      ...signUpInput,
    });
    return newUser;
  }

  async signIn(signInInput: SignInInput) {
    const user = await this.usersRepository.findOne({
      where: { email: signInInput.email },
    });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    const comparePassword = await compare(signInInput.password, user.password);
    if (!user || !comparePassword) {
      throw new BadRequestException('Error in email or password');
    }
    const token = CreateToken({ user });

    return token;
  }

  async sendMail(sendEmailInput: SendEmailInput) {
    // 1- find user by email
    const user = await this.usersRepository.findOne({
      where: { email: sendEmailInput.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 2- generate hash reset random 6 degits and save it in db
    const resetCode = Math.floor(Math.random() * 999999).toString();

    const hashResetCode = createHash('sha256').update(resetCode).digest('hex');

    user.passwordResetCode = hashResetCode;
    user.passwordResetExpiration = (Date.now() + 10 * (60 * 1000)).toString();
    user.verifyResetCode = false;
    await user.save();

    // Send Email
    const message = `Hi ${user.name}.\n Enter this code to complete the reset. \n ${resetCode} `;
    const options = {
      email: user.email,
      subject: 'your reset code valid for 10 min ',
      message: message,
    };
    await sendEmail(options);
    return 'Enter reset code from your email';
  }

  async verifyResetCode(resetCodeInput: ResetCodeInput) {
    const hashResetCode = createHash('sha256')
      .update(resetCodeInput.resetCode)
      .digest('hex');
    const user = await this.usersRepository.findOne({
      where: { passwordResetCode: hashResetCode },
    });
    if (!user || !(user.passwordResetExpiration > Date.now().toString())) {
      throw new BadRequestException('Invalid reset code');
    }

    user.verifyResetCode = true;
    await user.save();
    return 'Valid Code';
  }

  async changePassword(changePassword: ChangePassword) {
    if (changePassword.password != changePassword.confirmPassword) {
      throw new BadRequestException('confirm password must be equal password');
    }
    const user = await this.usersRepository.findOne({
      where: { email: changePassword.email },
    });
    const hashResetPassword = await hash(changePassword.password, 10);
    user.password = hashResetPassword;

    await user.save();
    return 'Password Changed';
  }
}
