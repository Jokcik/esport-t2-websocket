import {Injectable, OnModuleInit} from '@nestjs/common';
import {RedisService} from './redis.service';
import {FeedTypes} from "./shared/feed-types.enum";
import {NotifyRedisService} from "./notify-redis.service";
import { WebsocketClientsService } from '../websocket/websocket-clients/websocket-clients.service';

@Injectable()
export class RedisController implements OnModuleInit {
  private feedChannel = 'notify:event';
  private objectChannel = 'notify:object';

  constructor(private redisService: RedisService,
              private notifyRedisService: NotifyRedisService,
              private websocketClientsService: WebsocketClientsService) {
  }

  public onModuleInit(): any {
    this.redisService.subscribe(this.feedChannel)
      .subscribe(([type, data]) => this.parseFeedEvents(type, data));

    this.redisService.subscribe(this.objectChannel)
      .subscribe(([type, data]) => this.parseObjectEvent(type, data));
  }

  private parseFeedEvents(type: FeedTypes, data: any) {
    switch (type) {
      case FeedTypes.CHANNEL_ONLINE: return this.notifyRedisService.eventChannelOnline(data);
      case FeedTypes.REGISTER_CONFIRM_PHONE: return this.notifyRedisService.eventRegisterConfirmPhone(data);
      case FeedTypes.REGISTER_CHANNEL: return this.notifyRedisService.eventRegisterChannel(data);

      case FeedTypes.SUCCESS_PREMIUM: return this.notifyRedisService.notifySuccessPremium(data);
      case FeedTypes.CREATE_TEAM: return this.notifyRedisService.notifyCreateTeam(data);
      case FeedTypes.PAYMENT_TICKETS: return this.notifyRedisService.notifyPaymentTickets(data);
      case FeedTypes.REGISTER_CUP: return this.notifyRedisService.notifyRegisterCup(data);
      case FeedTypes.CONFIRM_CUP: return this.notifyRedisService.notifyConfirmCup(data);
      case FeedTypes.NEW_MATCH: return this.notifyRedisService.notifyNewMatch(data);
      case FeedTypes.NEW_MATCH_PUBG: return this.notifyRedisService.notifyNewMatchPubg(data);

      case FeedTypes.SYSTEM_MESSAGE: return this.notifyRedisService.notifySystemEvent(data);
    }
  }

  private parseObjectEvent(type: string, data: any) {
    this.websocketClientsService.broadcast(`notify.objects:${type}`, data);
  }
}
