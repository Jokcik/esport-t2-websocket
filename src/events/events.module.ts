import {Module} from '@nestjs/common';
import {EventModelName} from "../core/constants";
import {MongooseModule} from '@nestjs/mongoose';
import {EventsService} from "./events.service";
import {NotifyEventService} from "./notify-event.service";
import {WebsocketClientsModule} from "../websocket/websocket-clients/websocket-clients.module";
import {EventSchema} from "../core/schema/event.schema";

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
