import {Injectable} from '@nestjs/common';
import {WebsocketFeedService} from './websocket-feed.service';
import {WebsocketEvents} from '../shared/events';
import {WsResponse} from '@nestjs/websockets';
import {ISocket} from "../shared/socket.interface";
import { EMPTY, Observable } from 'rxjs';
import {NotifyEvent} from "../../events/interface/event";
import {map} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable()
export class WebsocketFeedController {
  constructor(private socketFeed: WebsocketFeedService) {
  }

  public notifyObjects(client: ISocket, data: any) {
    client.join(`${WebsocketEvents.NOTIFY_OBJECTS}:${data}`);
    // client.on('disconnect', () => client.leave(`${WebsocketEvents.NOTIFY_OBJECTS}:${data}`));
    return EMPTY;
  }

  public notifyObjectsUnsubscribe(client: ISocket, data: any) {
    client.leave(`${WebsocketEvents.NOTIFY_OBJECTS}:${data}`);
    return EMPTY;
  }

  public getEvents(client: ISocket, data?: any): Observable<WsResponse<NotifyEvent[]>> {
    return fromPromise(this.socketFeed.getEvents(client.user._id))
      .pipe(map(events => this.wrapWsResponse(WebsocketEvents.GET_EVENTS, events)));
  }

  public deleteEvent(client: ISocket, data?: { eventId: string }): Observable<WsResponse<NotifyEvent[]>> {
    return fromPromise(this.socketFeed.deleteEvent(client.user, data.eventId))
      .pipe(map(events => this.wrapWsResponse(WebsocketEvents.GET_EVENTS, events)));
  }

  public deleteEvents(client: ISocket): Observable<WsResponse<NotifyEvent[]>> {
    return fromPromise(this.socketFeed.deleteEvents(client.user))
      .pipe(map(events => this.wrapWsResponse(WebsocketEvents.GET_EVENTS, events)));
  }

  public readEvents(client: ISocket, data?: { eventIds: string[] }): Observable<WsResponse<NotifyEvent[]>> {
    return fromPromise(this.socketFeed.readEvents(client.user, data.eventIds))
      .pipe(map(events => this.wrapWsResponse(WebsocketEvents.GET_EVENTS, events)));
  }

  private wrapWsResponse<T = any>(event: WebsocketEvents, data: T): WsResponse<T> {
    return { event, data };
  }
}
