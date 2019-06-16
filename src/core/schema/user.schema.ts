import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {GameModelName} from "../constants";

export const CupProfileAccount = new mongoose.Schema({
  account: String,
  game: {
    type: Schema.Types.ObjectId,
    ref: GameModelName
  },
  win: { type: Number, default: 0 },
  lose: { type: Number, default: 0 },
});

export const UserProfileSchema = new mongoose.Schema({
  games: [CupProfileAccount]
});

export const UserSchema = new mongoose.Schema({
  username: String,
  phone: String,
  token: String,
  avatar: String,
  email: String,
  tickets: { type: Number, default: 0 },
  rights: Number,
  profile: UserProfileSchema,
}, {collection: 'users', });

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.token;
    delete ret.hashedPassword;
    delete ret.salt;
    delete ret.role;
    delete ret.fio;
    delete ret.createdAt;
    delete ret.online;
    delete ret.paid_till_premium;

    ret.premium = new Date(ret.paid_till_premium) >= new Date() ? 1 : 0;
  }
});
