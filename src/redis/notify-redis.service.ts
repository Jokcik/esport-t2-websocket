import {Injectable} from "@nestjs/common";
import {NotifyEventService} from "../events/notify-event.service";
import {UserEntity} from "../authenticate/a-user";

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
}
