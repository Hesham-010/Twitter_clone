import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DatabaseModule } from 'database/database.module';
import { usersProviders } from '../common/providers/users.providers';
import { UsersResolver } from './resolvers/users.resolvers';
import { loggedUserService } from './services/loggedUser.service';
import { loggedUserResolver } from './resolvers/loggedUser.resolvers';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    UploadService,
    UsersResolver,
    UsersService,
    ...usersProviders,
    loggedUserService,
    loggedUserResolver,
  ],
  exports: [...usersProviders],
})
export class UsersModule {}
