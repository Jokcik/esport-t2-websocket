import {Injectable, OnModuleInit} from '@nestjs/common';
import {RedisService} from './redis.service';
import {FeedTypes} from "./shared/feed-types.enum";
import {NotifyRedisService} from "./notify-redis.service";
import * as cluster from "cluster";

@Injectable()
export class RedisController implements OnModuleInit {
  private feedChannel = 'notify:event';

  constructor(private redisService: RedisService,
              private notifyRedisService: NotifyRedisService) {
  }

  public onModuleInit(): any {
    if (cluster.isMaster) {
      this.redisService.subscribeFeed(this.feedChannel)
        .subscribe(([type, data]) => this.parseFeedEvents(type, data));
    }
  }

  private parseFeedEvents(type: FeedTypes, data: any) {
    switch (type) {
      case FeedTypes.CHANNEL_ONLINE: return this.notifyRedisService.eventChannelOnline(data);
      case FeedTypes.REGISTER_CONFIRM_PHONE: return this.notifyRedisService.eventRegisterConfirmPhone(data);
      case FeedTypes.REGISTER_CHANNEL: return this.notifyRedisService.eventRegisterChannel(data);
    }
  }

  private() {

  }
}
