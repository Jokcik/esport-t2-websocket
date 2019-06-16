import {Injectable, OnModuleInit} from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketEvents } from '../shared/events';
import * as cluster from "cluster";
import {hub} from "../../core/hub";


@Injectable()
export class WebsocketClientsService implements OnModuleInit {
  constructor(private socketService: WebsocketService) {
  }

  public sendTo(userId: string, event: WebsocketEvents, data: any) {
    if (cluster.isMaster) {
      const all = this.socketService.clients.filter(socket => socket.user && socket.user._id.toString() === userId);
      all.forEach(socket => socket.emit(event, data));

      return;
    }

    hub.sendToMaster('sendTo', { userId, event, data });
  }

  public sendMany(event: WebsocketEvents, data: any, ...userIds: string[]) {
    if (cluster.isMaster) {
      userIds.forEach(id => this.sendTo(id, event, data));
      return;
    }

    hub.sendToMaster('sendMany', { event, data, userIds });
  }

  onModuleInit(): any {
    if (!cluster.isMaster) { return; }

    hub.on('sendTo', obj => this.sendTo(obj.userId, obj.event, obj.data));
    hub.on('v', obj => this.sendMany(obj.event, obj.data, ...obj.userIds));
  }
}
