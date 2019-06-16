import {DocumentQuery, Model, Schema, Types} from 'mongoose';
import {HttpService, Inject, Injectable} from '@nestjs/common';
import {CupProfileAccount, CupProfileUser, User} from './interfaces/user.interface';
import {UserModelToken} from '../core/constants';
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {AUser, UserEntity} from "../authenticate/a-user";
import {CWUtils} from "../core/cw-utils";
import ObjectId = Types.ObjectId;

@Injectable()
export class UsersService {
  constructor(@Inject(UserModelToken) private readonly userModel: Model<User>,
              private utilsService: CWUtils,
              private httpService: HttpService) {
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find();
    return users.map(user => plainToClass(UserEntity, <User>user.toJSON()));
  }

  async findByManyId(ids: string[], admin: boolean = false) {
    const users = await this.userModel.find({_id: {$in: ids}});
    return users.map(user => plainToClass(UserEntity, <User>user.toJSON(), { groups: [ 'admin' ] }));
  }

  async findByToken(token: string) {

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

  async updatePremium(userId: string, date: number) {
    const user = await this.findById(userId);

    const premiumPaidTill = this.utilsService.formatToPremium(new Date(date));
    const msisdn = user.phone;

    await this.updatePremiumSpace(msisdn, premiumPaidTill);
    await this.updatePremiumSite(msisdn);

    return;
  }

  private async updatePremiumSpace(msisdn: string, premiumPaidTill: string) {
    console.log('updatePremiumSpace', msisdn, premiumPaidTill);
    // const apiUrl = 'http://10.27.0.33:8090/api/users/premium';
    const apiUrl = 'http://46.47.223.53/api/users/premium';
    const response = await this.httpService.post(apiUrl, { msisdn, premiumPaidTill }).pipe(map(result => result.data)).toPromise();

    return response;
  }

  private async updatePremiumSite(msisdn: string) {
    msisdn = msisdn && msisdn[0] === '+' ? msisdn.slice(1) : msisdn;
    const apiUrl = 'https://cyberhero.tele2.ru/api/user/update';
    const response = await this.httpService.post(apiUrl, { msisdn }).pipe(map(result => result.data)).toPromise();

    return response;
  }

  public async setProfileNickname(user: AUser, gameId: string, nickname: string) {
    let { profile, myAccount } = await this.getAccount(user._id, gameId);
    if (!myAccount) {
      myAccount = new CupProfileAccount(gameId);
      profile.games.push(<CupProfileAccount>myAccount);
    }

    myAccount.account = nickname;
    return await this.userModel.findOneAndUpdate({_id: user._id}, { profile }, {new: true});
  }

  private async getAccount(userId: string, gameId: string) {
    const currentUser = (await this.findById(userId)).toObject();
    const profile = currentUser.profile ? currentUser.profile : new CupProfileUser();
    const myAccount: CupProfileAccount = profile.games.find(game => game.game && game.game.toString() === gameId.toString());

    return { profile, myAccount };
  }
}
