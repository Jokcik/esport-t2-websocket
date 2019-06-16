import { Module } from '@nestjs/common';
import {WebsocketGateway} from './websocket.gateway';
import {WebsocketLogger} from "./shared/socket.interface";
import {WebsocketFeedModule} from "./websocket-feed/websocket-feed.module";
import {WebsocketClientsModule} from "./websocket-clients/websocket-clients.module";
import * as cluster from "cluster";

@Module({
  imports: [
    WebsocketClientsModule,
    WebsocketFeedModule,
  ],
  providers: [
    (cluster.isMaster ? WebsocketGateway : { provide: '', useValue: '' }),
    WebsocketLogger,
  ]
})
export class WebsocketModule {
}
