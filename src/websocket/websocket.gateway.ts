import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Server } from 'socket.io';
import { WebsocketEvents } from './shared/events';
import { ISocket } from './shared/socket.interface';
import { WebsocketService } from './websocket-clients/websocket.service';
import { WebsocketFeedController } from './websocket-feed/websocket-feed.controller';

@WebSocketGateway({ path: '/feed', transports: ['websocket'] })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  public server: Server;

  constructor(private websocketFeedController: WebsocketFeedController,
              @Inject('Logger') private logger: Logger,
              private websocketService: WebsocketService) {
  }

  public async handleConnection(client: ISocket) {
    try {
      this.websocketService.handleConnection(client);
    } catch (e) {
      console.log('error handleConnection');
    }
  }

  public handleDisconnect(client: ISocket) {
    try {
      this.websocketService.handleDisconnect(client);
    } catch (e) {
      console.log('error handleDisconnect');
    }
  }

  @SubscribeMessage(WebsocketEvents.NOTIFY_OBJECTS)
  public onObjects(client: ISocket, data: any): Observable<WsResponse<any>> {
    return this.onResult(this.websocketFeedController.notifyObjects(client, data));
  }

  @SubscribeMessage(WebsocketEvents.NOTIFY_OBJECTS_UNSUBSCRIBE)
  public unsubscribeObjects(client: ISocket, data: any): Observable<WsResponse<any>> {
    return this.onResult(this.websocketFeedController.notifyObjectsUnsubscribe(client, data));
  }

  @SubscribeMessage(WebsocketEvents.GET_EVENTS)
  public getEvents(client: ISocket, data: any): Observable<WsResponse<any>> {
    return this.onResult(this.websocketFeedController.getEvents(client, data));
  }

  @SubscribeMessage(WebsocketEvents.DELETE_EVENT)
  public deleteEvent(client: ISocket, data: any): Observable<WsResponse<any>> {
    return this.onResult(this.websocketFeedController.deleteEvent(client, data));
  }

  @SubscribeMessage(WebsocketEvents.DELETE_EVENTS)
  public deleteEvents(client: ISocket, data: any): Observable<WsResponse<any>> {
    return this.onResult(this.websocketFeedController.deleteEvents(client));
  }

  @SubscribeMessage(WebsocketEvents.READ_EVENTS)
  public readEvents(client: ISocket, data: any): Observable<WsResponse<any>> {
    return this.onResult(this.websocketFeedController.readEvents(client, data));
  }

  onModuleInit(): any {
    this.websocketService.setServer(this.server);
  }

  private onResult<T>(observable: Observable<T>) {
    return observable.pipe(catchError(value => {
      this.logger.log('error onResult', value);
      return EMPTY;
    }));
  }
}
