import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import {CupTeamPlayerModelName, GameModelName, StreamModelName, UserModelName} from '../../core/constants';
import Mixed = Schema.Types.Mixed;

export const EventObjSchema = new mongoose.Schema({
  id: String,
  title: String,
  link: String,
  avatar: String
}, { _id: false });

export const EventSchema = new mongoose.Schema({
  createdAt: Date,
  info: {
    prefix: String,
    title: String,
    link: String,
    postfix: String,
  },
  from: EventObjSchema,
  status: String,
  to: EventObjSchema,
  type: String,
  payload: [{
    title: String,
    action: String,
    link: String,
    // data: Mixed,
  }],
});

