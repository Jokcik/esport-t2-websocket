import { Module } from '@nestjs/common';
import { WebsocketModule } from "./websocket/websocket.module";
import { MongooseModule } from '@nestjs/mongoose';
import {RedisModule} from "./redis/redis.module";
import {AuthModule} from "./authenticate/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cw'),
    RedisModule,
    AuthModule,

    WebsocketModule
  ],
  providers: [],
})
export class AppModule {
}
