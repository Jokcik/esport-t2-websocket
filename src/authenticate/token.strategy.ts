import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {AUser} from './shared/a-user';
import {Strategy} from 'passport-token-auth';
import {PassportStrategy} from '@nestjs/passport';
import {User} from "./shared/user.interface";
import {InjectModel} from '@nestjs/mongoose';
import {UserModelName} from "../core/constants";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(UserModelName) private readonly userModel: Model<User>) {
    super();
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
