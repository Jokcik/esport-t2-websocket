import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse
} from "@nestjs/websockets";
import { Server } from 'socket.io';
import {Inject, Logger} from "@nestjs/common";
import {WebsocketService} from "./websocket-clients/websocket.service";
import {ISocket} from "./shared/socket.interface";
import {WebsocketEvents} from "./shared/events";
import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {WebsocketFeedController} from "./websocket-feed/websocket-feed.controller";

@WebSocketGateway(3003, { path: '/feed' })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
      console.log('error handleConnection')
    }
  }

  public handleDisconnect(client: ISocket) {
    try {
      this.websocketService.handleDisconnect(client);
    } catch (e) {
      console.log('error handleDisconnect')
    }
  }

  @SubscribeMessage(WebsocketEvents.GET_EVENTS)
  public getEvents(client: ISocket, data: any): Observable<WsResponse<any>> {
    return this.onResult(this.websocketFeedController.getEvents(client, data));
  }

  @SubscribeMessage(WebsocketEvents.DELETE_EVENT)
  public deleteEvents(client: ISocket, data: any): Observable<WsResponse<any>> {
    return this.onResult(this.websocketFeedController.deleteEvent(client, data));
  }

  @SubscribeMessage(WebsocketEvents.READ_EVENTS)
  public readEvents(client: ISocket, data: any): Observable<WsResponse<any>> {
    return this.onResult(this.websocketFeedController.readEvents(client, data));
  }

  private onResult<T>(observable: Observable<T>) {
    return observable.pipe(catchError(value => {
      this.logger.log('error onResult', value);
      return EMPTY;
    }));
  }
}
