import { Module } from '@nestjs/common';
import { WebsocketClientsService } from './websocket-clients.service';
import { WebsocketService } from './websocket.service';
import { WebsocketLogger } from '../shared/socket.interface';
import {AuthModule} from "../../authenticate/auth.module";

@Module({
  imports: [
    AuthModule
  ],
  providers: [
    WebsocketClientsService,
    WebsocketService,
    WebsocketLogger
  ],
  exports: [
    WebsocketService,
    WebsocketClientsService,
  ]
})
export class WebsocketClientsModule {
}
