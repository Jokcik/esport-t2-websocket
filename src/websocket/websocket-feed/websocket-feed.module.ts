import { Module } from '@nestjs/common';
import { WebsocketFeedController } from './websocket-feed.controller';
import { WebsocketFeedService } from './websocket-feed.service';
import { WebsocketClientsModule } from "../websocket-clients/websocket-clients.module";
import { EventsModule } from "../../events/events.module";

@Module({
  imports: [
    EventsModule,
    WebsocketClientsModule,
  ],
  providers: [
    WebsocketFeedService,
    WebsocketFeedController
  ],
  exports: [
    WebsocketFeedController
  ]
})
export class WebsocketFeedModule {}
