import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { DatabaseModule } from 'database/database.module';
import { usersProviders } from 'src/common/providers/users.providers';

@Module({
  imports: [DatabaseModule],
  providers: [AuthResolver, AuthService, ...usersProviders],
})
export class AuthModule {}
