import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketEvents } from '../shared/events';


@Injectable()
export class WebsocketClientsService {
  constructor(private socketService: WebsocketService) {
  }

  public sendTo(userId: string, event: WebsocketEvents, data: any) {
    const all = this.socketService.clients.filter(socket => socket.user && socket.user._id.toString() === userId);
    all.forEach(socket => socket.emit(event, data));

    return;
  }

  public sendMany(event: WebsocketEvents, data: any, ...userIds: string[]) {
    userIds.forEach(id => this.sendTo(id, event, data));
  }

  public broadcast(channel: string, data: any) {
    this.socketService.broadcast(channel, data);
  }
}
