import {createParamDecorator, ReflectMetadata, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const User = createParamDecorator((data, req) => {
  return req.user;
});

export const DbConnectionToken = 'DbConnectionToken';

export const CupModelToken = 'CupModelToken';
export const CupModelName = 'cups';

export const CupTeamPlayerModelName = 'cups_team_player';
export const EventModelName = 'events';

export const PaymentModelName = 'payment';
export const TicketModelName = 'tickets';

export const GameModelToken = 'GameModelToken';
export const GameModelName = 'games';

export const UserModelToken = 'UserModelToken';
export const UserModelName = 'users';

export const TeamModelToken = 'TeamModelToken';
export const TeamModelName = 'teams';

export const StreamModelToken = 'ChannelModelToken';
export const StreamModelName = 'channel';

export const CONFIRM_CUP_TIME = 'CONFIRM_CUP_TIME';
const CONFIRM_CUP_TIME_VALUE = 1000 * 60 * 30; // 30 минут

const callback = (err, user, info) => {
  if (err) {
    throw err || new UnauthorizedException();
  }

  return user;
};

export const AuthGuardJwt = AuthGuard('token');
export const AuthGuardJwtWithout401 = AuthGuard('token', {session: false, callback});

export const confirmCupTimeProvider = {
  provide: CONFIRM_CUP_TIME,
  useValue: CONFIRM_CUP_TIME_VALUE,
};

export const Roles = (...roles: number[]) => ReflectMetadata('roles', roles);

export const RolesTypes = {
  ALL: 0,
  CREATOR: 1,
  JUDJE: 2,
  ADMIN: 3,
  SUPERADMIN: 4
};

export declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
