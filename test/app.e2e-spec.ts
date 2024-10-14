// @ts-ignore

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from '../src/events/events.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { CreateEventDto, UpdateEventDto } from '../src/events/events.dto';
import { Event } from '../src/events/events.schema'

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      // imports: [AppModule],\
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        EventsModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  //
  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });


  const getEventAll = async (): Promise<Array<Event>> => {
    const res = await request(app.getHttpServer()).get('/events');
    expect(res.status).toEqual(200);
    return res.body as Array<Event>;
  }

  describe('EventsController (e2e)', () => {


    describe('Create API of Event', () => {


      // it('OK /events (POST)', async () => {
      //   const body: CreateEventDto = {
      //     name: "test-event2"
      //   }
      //   const res = await request(app.getHttpServer())
      //     .post('/events')
      //     .set('Accept', 'application/json')
      //     .send(body);
      //   expect(res.status).toEqual(201);
      //
      //   const eventResponse = res.body as Event;
      //   expect(eventResponse).toHaveProperty('_id');
      //   expect(eventResponse.name).toEqual(body.name);
      // });

      it('NG /api/events (POST): Incorrect parameters', async () => {
        const body = {
          namefail: "test-event"
        }
        const res = await request(app.getHttpServer())
          .post('/events')
          .set('Accept', 'application/json')
          .send(body);
        expect(res.status).toEqual(500);
      });

      it('NG /events (POST): Empty parameters.', async () => {
        const body = {}
        const res = await request(app.getHttpServer())
          .post('/events')
          .set('Accept', 'application/json')
          .send(body);
        expect(res.status).toEqual(500);
      });
    });

    describe.only('Read API of Event', () => {
      it('OK /events (GET)', async () => {
        const eventsResponse = await getEventAll();
        expect(eventsResponse.length).toEqual(6);
        console.log( eventsResponse.concat() );

      });

      it('OK /events/:id (GET)', async () => {
        const eventsResponse = await getEventAll();
        console.log( 'get first id : ' + `${eventsResponse[0]._id}` );
        const res = await request(app.getHttpServer())
          .get(`/events/${eventsResponse[0]._id}`);
        expect(res.status).toEqual(200);

        const eventResponse = res.body as Event;
        expect(eventResponse).toHaveProperty('_id');
        expect(eventResponse.name).toEqual('test-event-1');
      });

      it('NG /events/:id (GET): Invalid id.', async () => {
        const res = await request(app.getHttpServer())
          .get('/events/XXXXXXXXXXX');
        expect(res.status).toEqual(500);
      });

      it('NG /events/:id (GET): id that doesn\'t exist.', async () => {
        const res = await request(app.getHttpServer())
          .get('/events/5349b4ddd2781d08c09890f4');
        expect(res.status).toEqual(200);
      });
    });
  });
//appController
});
