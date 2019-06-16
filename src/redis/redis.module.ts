import { Module } from '@nestjs/common';
import { RedisController } from './redis.controller';
import { createClient, Multi, RedisClient } from 'redis';
import { promisifyAll } from 'bluebird';
import { RedisService } from './redis.service';
import { RedisLogger } from "../websocket/shared/socket.interface";
import {EventsModule} from "../events/events.module";
import {NotifyRedisService} from "./notify-redis.service";

promisifyAll(RedisClient.prototype);
promisifyAll(Multi.prototype);

@Module({
  imports: [
    EventsModule
  ],
  providers: [
    RedisLogger,
    RedisService,
    RedisController,
    NotifyRedisService,
    {
      provide: 'RedisSubscriberToken',
      useFactory: () => createClient(),
      inject: [],
    },
  ],
  exports: [
    RedisController
  ]
})
export class RedisModule {
}
