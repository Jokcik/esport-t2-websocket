import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AUser } from '../authenticate/shared/a-user';
import { DeepPartial, EventModelName } from '../core/constants';
import { NotifyEvent, Status } from './interface/event';
import ObjectId = Types.ObjectId;

@Injectable()
export class EventsService {
  constructor(@InjectModel(EventModelName) private readonly eventModel: Model<NotifyEvent>) {
  }

  public async getEvent(eventId: string): Promise<NotifyEvent> {
    return this.eventModel.findOne({ _id: eventId });
  }

  public async getEvents(userId: string) {
    return this.eventModel.find({ 'to.id': userId, status: { $not: { $eq: Status.DELETED } } })
      .sort({ createdAt: -1 });
  }

  public async deleteEvent(user: AUser, eventId: string): Promise<NotifyEvent> {
    const event = await this.getEvent(eventId);
    if (event.to.id !== user._id.toString()) {
      throw new ForbiddenException();
    }

    return await this.eventModel.findOneAndUpdate({ _id: eventId }, { status: Status.DELETED });
  }

  public async deleteEvents(user: AUser): Promise<NotifyEvent> {
    return await this.eventModel.updateMany({ 'to.id': user._id }, { status: Status.DELETED });
  }

  public async readEvents(user: AUser, eventIds: string[]): Promise<NotifyEvent> {
    eventIds = <any>eventIds.map(event => new ObjectId(event));
    return await this.eventModel.updateMany({ _id: { $in: eventIds } }, { $set: { status: Status.CONFIRM } });
  }

  public async saveEvent(notify: DeepPartial<NotifyEvent>) {
    return await this.eventModel.findOneAndUpdate({ _id: notify._id }, notify, { upsert: true, new: true });
  }
}
