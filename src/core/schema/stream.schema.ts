import {GameModelName, UserModelName} from "../constants";
import * as mongoose from 'mongoose';

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
