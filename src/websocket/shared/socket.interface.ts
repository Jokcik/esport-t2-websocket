import { Socket, Handshake } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AUser } from "../../authenticate/shared/a-user";

export interface ISocket extends Socket{
  handshake: Handshake;
  user: AUser;
}


export const WebsocketLogger =
  {
    provide: 'Logger',
    useFactory: () => new Logger('Websocket', true)
  };

export const RedisLogger =
  {
    provide: 'Logger',
    useFactory: () => new Logger('Redis', true)
  };
