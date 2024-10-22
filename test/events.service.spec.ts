import { Test, TestingModule } from '@nestjs/testing';
import {EventsService} from "../src/events/events.service";

describe('EventsService', () => {
    let service: EventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventsService,
                {
                    provide: 'EventModel', // 실제 모델 또는 Mock 모델
                    useValue: {}, // Mock 데이터나 실제 모델 설정
                },
            ],
        }).compile();

        service = module.get<EventsService>(EventsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
