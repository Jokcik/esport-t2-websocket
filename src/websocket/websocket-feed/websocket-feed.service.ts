import { Injectable } from '@nestjs/common';
import {EventsService} from "../../events/events.service";
import {AUser} from "../../authenticate/shared/a-user";

@Injectable()
export class WebsocketFeedService {
  constructor(private eventService: EventsService) {
  }

  public getEvents(userId: string) {
    return this.eventService.getEvents(userId);
  }

  public async deleteEvent(user: AUser, eventId: string) {
    await this.eventService.deleteEvent(user, eventId);
    return this.getEvents(user._id);
  }

  public async deleteEvents(user: AUser) {
    await this.eventService.deleteEvents(user);
    return this.getEvents(user._id);
  }

  public async readEvents(user: AUser, eventIds: string[]) {
    await this.eventService.readEvents(user, eventIds);
    return this.getEvents(user._id);
  }
}
