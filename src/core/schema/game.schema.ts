import * as mongoose from 'mongoose';
import {UserSchema} from '../../users/schemas/user.schema';
import {GameModelName, UserModelName} from '../../core/constants';

export const GameSchema = new mongoose.Schema({
  title: String,
  name: String,
});

export const StreamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModelName,
  },
  instruction: String,
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GameModelName,
  },
  name: String,
  avatar: String,
});
