import {Global, Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {TokenStrategy} from './token.strategy';
import {usersProviders} from '../users/users.providers';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersModule} from "../users/users.module";

@Global()
@Module({
  imports: [
    UsersModule,
    MongooseModule,
    DatabaseModule
  ],
  providers: [
    TokenStrategy,
    ...usersProviders,
  ],
  exports: [
    TokenStrategy,
  ]
})
export class AuthModule {
}
