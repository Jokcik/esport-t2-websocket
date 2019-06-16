import {Global, Module} from '@nestjs/common';
import {TokenStrategy} from './token.strategy';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModelName} from "../core/constants";
import {UserSchema} from "../core/schema/user.schema";
import {UserService} from "./user.service";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModelName, schema: UserSchema }
    ]),
  ],
  providers: [
    TokenStrategy,
    UserService,
  ],
  exports: [
    TokenStrategy,
    UserService,
  ]
})
export class AuthModule {
}
