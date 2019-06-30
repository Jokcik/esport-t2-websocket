import {Injectable} from "@nestjs/common";
import {EventsService} from "./events.service";
import {DeepPartial} from "../core/constants";
import { ButtonEventPayload, EventTypeButton, EventTypeEnum, NotifyEvent, Status } from './interface/event';
import {
  getChannelLink,
  getChannelSettingsLink, getCupLink, getCupsLink, getMatchLink,
  getPremiumSettingsLink,
  getTeamLink, getTeamPlayersLink,
  getUserLink
} from "./interface/link-notify";
import { getSystemAvatar, getUserAvatar } from './interface/avatar-notify';
import {WebsocketClientsService} from "../websocket/websocket-clients/websocket-clients.service";
import {WebsocketEvents} from "../websocket/shared/events";
import {AUser, UserEntity} from "../authenticate/shared/a-user";
import {Types} from "mongoose";

@Injectable()
export class NotifyEventService {
  constructor(private eventsService: EventsService,
              private clientService: WebsocketClientsService) {
  }

  public notifyConfirmPhoneRegister(user: UserEntity, uniqueId: string) {
    const notify = this.createDefaultNotify();
    notify.info = { prefix: 'Добро пожаловать на CyberHero! Для завершения регистрации на сайте, необходимо пройти процедуру подтверждения телефона.' };
    notify.to = { id: user._id, avatar: getUserAvatar(user.avatar), link: getUserLink(user.username), title: user.username };
    notify.payload[0].link = getUserLink(user.username);

    this.newEvent(notify, uniqueId);
  }

  public notifyRegisterChannel(user: UserEntity, uniqueId: string) {
    const notify: DeepPartial<NotifyEvent> = this.createDefaultNotify();
    const link = getChannelLink(user.username);

    notify.info = { prefix: 'ваш канал', title: `https://cyberhero.tele2.ru${link}`, link, postfix: 'успешно создан. Для настроек канала перейдите на страницу Мой канал' };
    notify.to = { id: user._id, avatar: getUserAvatar(user.avatar), link: getUserLink(user.username), title: user.username };
    notify.payload[0].link = getChannelSettingsLink(user.username);
    notify.payload[0].title = 'Мой канал';

    this.newEvent(notify, uniqueId);
  }

  public notifySuccessPremium(user: UserEntity, type: string, uniqueId: string) {
    const notify: DeepPartial<NotifyEvent> = this.createDefaultNotify();
    notify.info = { prefix: 'вы успешно активировали подписку', title: type, postfix: 'для управления подписками перейдите на страницу настроек.' };
    notify.to = { id: user._id, avatar: getUserAvatar(user.avatar), link: getUserLink(user.username), title: user.username };
    notify.payload[0].link = getPremiumSettingsLink(user.username);
    notify.payload[0].title = 'Управление подписками';

    this.newEvent(notify, uniqueId);
  }

  public notifyCreateTeam(user: UserEntity, teamTitle: string, teamId: string, uniqueId: string) {
    const notify: DeepPartial<NotifyEvent> = this.createDefaultNotify();
    notify.info = { prefix: 'ваша команда', title: teamTitle, link: getTeamLink(teamId), postfix: 'успешно создана. Чтобы пригласить игроков, перейдите на страницу настроек' };
    notify.to = { id: user._id, avatar: getUserAvatar(user.avatar), link: getUserLink(user.username), title: user.username };
    notify.payload[0].link = getTeamPlayersLink(teamId);
    notify.payload[0].title = 'Управление командой';

    this.newEvent(notify, uniqueId);
  }

  public notifyPaymentTickets(user: UserEntity, tickets: number, uniqueId: string) {
    const notify: DeepPartial<NotifyEvent> = this.createDefaultNotify();
    notify.info = { prefix: `вы успешно приобрели ${tickets} электронных билет (ов). Вы можете принять участие в турнирах с призовым фондом` };
    notify.to = { id: user._id, avatar: getUserAvatar(user.avatar), link: getUserLink(user.username), title: user.username };
    notify.payload[0].link = getCupsLink();
    notify.payload[0].title = 'Список турниров';

    this.newEvent(notify, uniqueId);
  }

  public notifyRegisterCup(toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string, uniqueId: string) {
    const notify: DeepPartial<NotifyEvent> = this.createDefaultNotify();
    notify.info = { prefix: 'ваша заявка на участие в турнире', title: cupTitle, link: getCupLink(cupUrl), postfix: 'зарегистрирована. Для получения подробной информации о турнире – перейдите на страницу турнира' };
    notify.to = { id: toId, avatar: toAvatar, link: toLink, title: toUsername };
    notify.payload[0].link = getCupLink(cupUrl);
    notify.payload[0].title = 'Страница турнира';

    this.newEvent(notify, uniqueId);
  }

  public notifyConfirmCup(toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string, uniqueId: string) {
    const notify: DeepPartial<NotifyEvent> = this.createDefaultNotify();
    notify.info = { prefix: `необходимо пройти процедуру подтверждения участия в турнире ${cupTitle}` };
    notify.to = { id: toId, avatar: toAvatar, link: toLink, title: toUsername };
    notify.payload[0].link = getCupLink(cupUrl);
    notify.payload[0].title = 'Подтвердить';

    this.newEvent(notify, uniqueId);
  }

  public notifyNewMatch(toId: string, toUsername: string, toAvatar: string, toLink: string, cupTitle: string, cupUrl: string, matchId: number, uniqueId: string) {
    const notify: DeepPartial<NotifyEvent> = this.createDefaultNotify();
    notify.info = { prefix: "у вас есть новый матч. Для получения более подробной информации – перейдите на страницу матча" };
    notify.to = { id: toId, avatar: toAvatar, link: toLink, title: toUsername };
    notify.payload[0].link = getMatchLink(cupUrl, matchId);
    notify.payload[0].title = 'Страница матча';

    this.newEvent(notify, uniqueId);
  }

  public notifySystemEvent(user: UserEntity, prefix: string, title: string, link: string, postfix: string, payload: ButtonEventPayload, uniqueId: string) {
    const notify = this.createDefaultNotify();
    notify.info = { prefix, title, link, postfix };
    notify.to = { id: user._id, avatar: getSystemAvatar() };
    notify.payload[0] = payload;

    this.newEvent(notify, uniqueId);
  }

  public notifyEvent(event: DeepPartial<NotifyEvent>, uniqueId: string) {
    this.newEvent(event, uniqueId);
  }

  public notifyStreamerOnline(user: UserEntity, streamerName: string, uniqueId: string) {
    const notify = this.createDefaultNotify();
    notify.info = { prefix: 'Канал', title: streamerName, link: getChannelLink(streamerName), postfix: 'начал прямую трансляцию' };
    notify.to = { id: user._id, avatar: getUserAvatar(user.avatar), link: getUserLink(user.username), title: user.username };
    notify.payload[0].link = getChannelLink(streamerName);
    notify.payload[0].title = 'Смотреть';

    this.newEvent(notify, uniqueId);
  }

  private createDefaultNotify(): DeepPartial<NotifyEvent> {
    const notify: DeepPartial<NotifyEvent> = {};
    notify.type = EventTypeEnum.NOTIFY;
    notify.createdAt = new Date();
    notify.status = Status.ACTIVE;
    notify.payload = [ { action: EventTypeButton.CONFIRM, title: 'Подтвердить' } ];

    return notify;
  }

  private async newEvent(notify: DeepPartial<NotifyEvent>, uniqueId: string) {
    notify._id = uniqueId || new Types.ObjectId();
    let event;
    try {
      event = await this.eventsService.saveEvent(notify);
    } catch (e) {
      event = await this.eventsService.saveEvent(notify);
    }

    this.clientService.sendTo(event.to.id, WebsocketEvents.NEW_EVENT, event)
  }
}
