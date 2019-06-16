export const CupModelName = 'cups';
export const CupTeamPlayerModelName = 'cups_team_player';
export const EventModelName = 'events';
export const PaymentModelName = 'payment';
export const TicketModelName = 'tickets';
export const GameModelName = 'games';
export const UserModelName = 'users';
export const TeamModelName = 'teams';
export const StreamModelName = 'channel';

export declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
