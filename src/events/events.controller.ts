//import { Controller } from '@nestjs/common';
//これはルール
import { Param, Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
// service 追加
import { EventsService } from './events.service'
//　Data schema　追加
import { Event } from './events.schema'
import {
  CreateEventDto,
  UpdateEventDto
} from './events.dto'
@Controller('events')
export class EventsController {
  // コンストラクターインジェクションで EventsService を生成して EventsController で利用する
  constructor(private readonly eventsService: EventsService) {}

  // POST events へアクセス時に呼び出される関数
  // request　CreateEventDtoを利用
  @Post()
  async create(@Body() request: CreateEventDto): Promise<Event> {
    console.log('post');
    return this.eventsService.create(request.name)
  }

  // GET events/:id へアクセス時に呼び出される関数
  @Get(':id')
  async readOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.readOne(id)
  }

  // GET events へアクセス時に呼び出される関数
  @Get()
  async readAll(): Promise<Event[]> {
    console.log('get');
    return this.eventsService.readAll()
  }

  // PATCH events/:id へアクセス時に呼び出される関数
  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateEventDto): Promise<Event> {
    return this.eventsService.update(id, request.name)
  }

  // DELETE events/:id へアクセス時に呼び出される関数
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Event> {
    return this.eventsService.delete(id)
  }

}
