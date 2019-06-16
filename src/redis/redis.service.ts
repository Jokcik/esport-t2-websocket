import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { RedisClient } from 'redis';
import {Observable} from "rxjs";
import {FeedTypes} from "./shared/feed-types.enum";

@Injectable()
export class RedisService {
  private subscriber: RedisClient | any;

  constructor(@Inject('RedisSubscriberToken') subscriber: RedisClient) {
    this.subscriber = subscriber;
  }

  public subscribe<T>(channel: string): Observable<[ FeedTypes, T ]> {
    this.subscriber.subscribe(channel);
    return new Observable(observer => {
      this.subscriber.on("message", (channelMessage, data) => {
        if (channel !== channelMessage) { return; }
        observer.next(JSON.parse(data));
      })
    });
  }
}

