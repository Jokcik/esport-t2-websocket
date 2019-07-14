import {Document} from 'mongoose';
import {Types} from "mongoose";

export enum Status {
  ACTIVE = 'ACTIVE',
  CONFIRM = 'CONFIRM',
  DELETED = 'DELETED'
}

export interface ButtonEventPayload {
  title: string;
  action: EventTypeButton;
  link: string;
  data: any;
}

export interface FeedEventInfo {
  prefix: string;
  title: string;
  link: string;
  postfix: string;
}

export enum EventTypeButton {
  CONFIRM = 'confirm',
}

export enum EventTypeEnum {
  NOTIFY = 'NOTIFY',
}

export class EventObj {
  id: string;
  title: string;
  link: string;
  avatar: string;
}

export interface NotifyEvent extends Document {
  _id: string | Types.ObjectId;
  createdAt: Date;
  info: FeedEventInfo;
  from: EventObj;
  status: Status;
  to: EventObj;
  type: EventTypeEnum;
  payload: ButtonEventPayload[];
}
