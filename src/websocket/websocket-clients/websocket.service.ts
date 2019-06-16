import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ISocket } from '../shared/socket.interface';
import {TokenStrategy} from "../../authenticate/token.strategy";
import {User} from "../../users/interfaces/user.interface";
import {AUser} from "../../authenticate/a-user";

@Injectable()
export class WebsocketService {
  public clients: ISocket[] = [];

  constructor(private tokenStrategy: TokenStrategy,
              @Inject('Logger') private logger: LoggerService) {
  }

  public async handleConnection(client: ISocket) {
    const token = client.handshake.query.token;
    this.logger.log(`Client connected => id: ${client.id}; token: ${token}`);

    const user: User = await this.tokenStrategy.getUserByToken(token);
    if (!user) { return; }
    client.user = new AUser(user);

    this.clients.push(client);
  }

  public handleDisconnect(client: ISocket) {
    this.logger.log(`Client disconnected => id: ${client.id}`);
    this.clients = this.clients.filter(c => c.id !== client.id);
  }

  public isUserConnected(userId) {
    return this.clients.some(c => c.user && c.user._id.toString() == userId.toString());
  }
}
