import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketLogger } from "./shared/socket.interface";
import { WebsocketFeedModule } from "./websocket-feed/websocket-feed.module";
import { WebsocketClientsModule } from "./websocket-clients/websocket-clients.module";

@Module({
  imports: [
    WebsocketClientsModule,
    WebsocketFeedModule,
  ],
  providers: [
    WebsocketGateway,
    WebsocketLogger,
  ]
})
export class WebsocketModule {
}
