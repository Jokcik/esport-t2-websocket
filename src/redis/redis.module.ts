import { Module } from '@nestjs/common';
import { RedisController } from './redis.controller';
import { createClient, Multi, RedisClient } from 'redis';
import { promisifyAll } from 'bluebird';
import { RedisService } from './redis.service';
import { RedisLogger } from "../websocket/shared/socket.interface";
import {EventsModule} from "../events/events.module";
import {NotifyRedisService} from "./notify-redis.service";
import { WebsocketClientsModule } from '../websocket/websocket-clients/websocket-clients.module';

promisifyAll(RedisClient.prototype);
promisifyAll(Multi.prototype);

@Module({
  imports: [
    EventsModule,
    WebsocketClientsModule
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
