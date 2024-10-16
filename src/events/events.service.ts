import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose'; //←
import { Model } from 'mongoose';   //←
import { Event } from './events.schema';   //←

@Injectable()
export class EventsService {
  // コンストラクターインジェクションで
  // EventModule で import した Model<Event> を生成する
  constructor(
    // MongooseModule でインポートした場合は @nestjs/mongoose に用意されている
    // @InjectModel デコレータでインジェクション時に名前を定義する必要がある
    @InjectModel(Event.name)
    private eventModel: Model<Event>,
  ) {}

  // Event を作成する
  async create(name: string): Promise<Event> {
    const createdEvent = new this.eventModel({ name: name });
    return createdEvent.save();
  }

  // Id 指定した Event を読み込む
  async readOne(id: string): Promise<Event> {
    return this.eventModel.findById(id).exec();
  }

  // Event を全件読み込む
  async readAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  // Id 指定した Event を更新する
  async update(id: string, name: string): Promise<Event> {
    // データ更新時に、更新後のデータを返却するためのオプションとして { new: true } を指定する
    // { new: true } を指定しないと更新前のデータが返却されるようになる
    return this.eventModel.findByIdAndUpdate(
      id, { name: name }, { new: true }
    ).exec();
  }

  // Id 指定した Event を削除する
  async delete(id: string): Promise<Event> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }

}
