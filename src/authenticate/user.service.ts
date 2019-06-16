import {DocumentQuery, Model, Schema, Types} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {plainToClass} from "class-transformer";
import {InjectModel} from '@nestjs/mongoose';
import {UserModelName} from "../core/constants";
import {User} from "./shared/user.interface";
import {UserEntity} from "./shared/a-user";
import ObjectId = Types.ObjectId;

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModelName) private readonly userModel: Model<User>) {
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find();
    return users.map(user => plainToClass(UserEntity, <User>user.toJSON()));
  }

  async findByManyId(ids: string[], admin: boolean = false) {
    const users = await this.userModel.find({_id: {$in: ids}});
    return users.map(user => plainToClass(UserEntity, <User>user.toJSON(), { groups: [ 'admin' ] }));
  }

  async findByMsisdn(msisdn: string) {
    const user = await this.userModel.findOne({ phone: msisdn });
    return plainToClass(UserEntity, <User>user.toJSON());
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username: new RegExp('^' + username + '$', "i") });
    return plainToClass(UserEntity, <User>user.toJSON());
  }

  findById(id: ObjectId | string): DocumentQuery<User, User, {}> {
    return this.userModel.findOne({ _id: id });
  }

  async appendTicketInUser(userId: string, count: number) {
    const user = await this.userModel.findOneAndUpdate({ _id: userId }, { $inc: { tickets: count } }, { new: true });
    return plainToClass(UserEntity, <User>user.toJSON());
  }
}
