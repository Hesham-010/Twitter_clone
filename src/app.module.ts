import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '../database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { TweetsModule } from './tweets/tweets.module';
import { FollowModule } from './follow/follow.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    TweetsModule,
    FollowModule,
    UploadModule,
  ],
  controllers: [],
})
export class AppModule {}
