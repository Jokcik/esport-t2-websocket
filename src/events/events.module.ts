import { Module } from '@nestjs/common';
import {CupModelName, CupTeamPlayerModelName, EventModelName} from "../core/constants";
import {CupTeamPlayerSchema} from "../cups/schemas/cup-player.schema";
import {CupSchema} from "../cups/schemas/cup.schema";
import {MongooseModule} from '@nestjs/mongoose';
import {EventSchema} from "./schemas/event.schema";
import {EventsService} from "./events.service";
import {NotifyEventService} from "./notify-event.service";
import {WebsocketClientsModule} from "../websocket/websocket-clients/websocket-clients.module";

@Module({
  imports: [
    WebsocketClientsModule,
    MongooseModule.forFeature([
      { name: EventModelName, schema: EventSchema },
    ]),
  ],
  providers: [
    EventsService,
    NotifyEventService
  ],
  exports: [
    EventsService,
    NotifyEventService
  ]
})
export class EventsModule {}
