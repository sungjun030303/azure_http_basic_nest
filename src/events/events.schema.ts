import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// イベントテーブルの定義
@Schema()
export class Event extends Document {
  // イベント名を保持する必須フィールドのみを持つ
  @Prop({ required: true })
  name: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);