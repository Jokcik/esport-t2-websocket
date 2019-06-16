import {Inject, Injectable} from '@nestjs/common';
import {UserModelToken} from '../core/constants';
import {Model} from 'mongoose';
import {User} from '../users/interfaces/user.interface';
import {AUser} from './a-user';
import {Strategy} from 'passport-token-auth';
import {PassportStrategy} from '@nestjs/passport';
import {UsersService} from "../users/users.service";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UserModelToken) private readonly userModel: Model<User>) {
    super({});
  }

  public getUserByToken(token: string): Promise<User> {
    return this.userModel.findOne({ token }).exec();
  }

  async validate(token, done) {
    let user = await this.getUserByToken(token);

    if (!user) {
        done(null, null);
        return;
    }

    done(null, new AUser(<any>user));
  }
}
