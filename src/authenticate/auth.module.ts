import {Global, Module} from '@nestjs/common';
import {TokenStrategy} from './token.strategy';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModelName} from "../core/constants";
import {UserSchema} from "../core/schema/user.schema";
import {UserService} from "./user.service";
import {CWUtils} from "../core/cw-utils";

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
    CWUtils
  ],
  exports: [
    TokenStrategy,
    UserService,
    CWUtils
  ]
})
export class AuthModule {
}
