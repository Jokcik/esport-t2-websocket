import { Socket, Handshake } from 'socket.io';
import { Logger } from '@nestjs/common';
import {AUser} from "../../authenticate/a-user";

export interface ISocket extends Socket{
  handshake: Handshake;
  user: AUser;
}

// export const CupTeamApiLogger =
//   {
//     provide: 'Logger',
//     useFactory: () => new Logger('CUP TEAM API', true)
//   };
//
// export const TeamApiLogger =
//   {
//     provide: 'Logger',
//     useFactory: () => new Logger('TEAM API', true)
//   };

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
