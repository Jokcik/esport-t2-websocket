import { Injectable } from '@nestjs/common';
import { UserEntity } from '../authenticate/shared/a-user';
import {NotifyEventService} from "../events/notify-event.service";
import { ButtonEventPayload, NotifyEvent } from '../events/interface/event';
import { DeepPartial } from '../core/constants';

@Injectable()
export class NotifyRedisService {
  constructor(private notifyEventsService: NotifyEventService) {
  }

  public notifyEvent(data: { event: DeepPartial<NotifyEvent>, _uniqueId: string }) {
    this.notifyEventsService.notifyEvent(data.event, data._uniqueId)
  }

  public eventChannelOnline(data: { user: UserEntity, title: string, _uniqueId: string }) {
    this.notifyEventsService.notifyStreamerOnline(data.user, data.title, data._uniqueId);
  }

  public eventRegisterConfirmPhone(data: { user: UserEntity, _uniqueId: string }) {
    this.notifyEventsService.notifyConfirmPhoneRegister(data.user, data._uniqueId);
  }

  public eventRegisterChannel(data: { user: UserEntity, _uniqueId: string }) {
    this.notifyEventsService.notifyRegisterChannel(data.user, data._uniqueId);
  }

  public notifySuccessPremium(data: { user: UserEntity, type: string, _uniqueId: string }) {
    this.notifyEventsService.notifySuccessPremium(data.user, data.type, data._uniqueId);
  }

  public notifyCreateTeam(data: { user: UserEntity, teamTitle: string, teamId: string, _uniqueId: string }) {
    this.notifyEventsService.notifyCreateTeam(data.user, data.teamTitle, data.teamId, data._uniqueId);
  }

  public notifyPaymentTickets(data: { user: UserEntity, tickets: number, _uniqueId: string }) {
    this.notifyEventsService.notifyPaymentTickets(data.user, data.tickets, data._uniqueId);
  }

  public notifyRegisterCup(data: { toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string, _uniqueId: string }) {
    this.notifyEventsService.notifyRegisterCup(data.toId, data.toUsername, data.toAvatar, data.toLink, data.cupTitle, data.cupUrl, data._uniqueId);
  }

  public notifyConfirmCup(data: { toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string, _uniqueId: string }) {
    this.notifyEventsService.notifyConfirmCup(data.toId, data.toUsername, data.toAvatar, data.toLink, data.cupTitle, data.cupUrl, data._uniqueId);
  }

  public notifyNewMatchPubg(data: { toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string, matchId: number, _uniqueId: string }) {
    this.notifyEventsService.notifyNewMatchPubg(data.toId, data.toUsername, data.toAvatar, data.toLink, data.cupTitle, data.cupUrl, data.matchId, data._uniqueId);
  }

  public notifyNewMatch(data: { toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string, matchId: number, _uniqueId: string }) {
    this.notifyEventsService.notifyNewMatch(data.toId, data.toUsername, data.toAvatar, data.toLink, data.cupTitle, data.cupUrl, data.matchId, data._uniqueId);
  }

  public notifySystemEvent(data: { user: UserEntity, prefix: string, title: string, link: string, postfix: string, payload: ButtonEventPayload, _uniqueId: string }) {
    this.notifyEventsService.notifySystemEvent(data.user, data.prefix, data.title, data.link, data.postfix, data.payload, data._uniqueId);
  }
}
