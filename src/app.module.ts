import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [    // ConfigModule の記述を追加することで .env の変数を自動で読み込むようになる
    ConfigModule.forRoot(),
    // MongooseModule を用いて MongoDB との接続を行う
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
