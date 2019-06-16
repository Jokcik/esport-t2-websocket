import {Injectable} from "@nestjs/common";
import {NotifyEventService} from "../events/notify-event.service";
import {UserEntity} from "../authenticate/shared/a-user";

@Injectable()
export class NotifyRedisService {
  constructor(private notifyEventsService: NotifyEventService) {
  }

  public eventChannelOnline(data: { user: UserEntity, title: string }) {
    this.notifyEventsService.notifyStreamerOnline(data.user, data.title)
  }

  public eventRegisterConfirmPhone(data: UserEntity) {
    this.notifyEventsService.notifyConfirmPhoneRegister(data)
  }

  public eventRegisterChannel(data: UserEntity) {
    this.notifyEventsService.notifyRegisterChannel(data)
  }

  public notifySuccessPremium(data: { user: UserEntity, type: string }) {
    this.notifyEventsService.notifySuccessPremium(data.user, data.type);
  }

  public notifyCreateTeam(data: { user: UserEntity, teamTitle: string, teamId: string }) {
    this.notifyEventsService.notifyCreateTeam(data.user, data.teamTitle, data.teamId);
  }

  public notifyPaymentTickets(data: { user: UserEntity, tickets: number }) {
    this.notifyEventsService.notifyPaymentTickets(data.user, data.tickets);
  }

  public notifyRegisterCup(data: { toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string }) {
    this.notifyEventsService.notifyRegisterCup(data.toId, data.toUsername, data.toAvatar, data.toLink, data.cupTitle, data.cupUrl);
  }

  public notifyConfirmCup(data: { toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string }) {
    this.notifyEventsService.notifyConfirmCup(data.toId, data.toUsername, data.toAvatar, data.toLink, data.cupTitle, data.cupUrl);
  }

  public notifyNewMatch(data: { toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string, matchId: number }) {
    this.notifyEventsService.notifyNewMatch(data.toId, data.toUsername, data.toAvatar, data.toLink, data.cupTitle, data.cupUrl, data.matchId);
  }
}
