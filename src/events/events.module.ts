import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './events.schema';

@Module({
  // 先程定義した EventSchema を MongooseModule でインポートする
  // これで Controller や Provider で Event が利用可能になる
  // 今回は Provider である EventsService で利用する想定
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
