import { Context, HttpRequest } from '@azure/functions';
import { createApp } from './main.azure';

export default async function (context: Context, req: HttpRequest): Promise<void> {
    const app = await createApp();
    const fastifyInstance = app.getHttpAdapter().getInstance();  // Fastify 인스턴스 가져오기

    try {
        // Fastify의 요청 객체로 Azure Functions의 요청을 처리
        await fastifyInstance.inject({
            method: req.method,
            url: req.url,
            headers: req.headers,
            payload: req.body,
        }).then((fastifyResponse) => {
            // Fastify 응답을 Azure Functions 응답으로 변환
            context.res = {
                status: fastifyResponse.statusCode,
                headers: fastifyResponse.headers,
                body: fastifyResponse.payload,
            };
        });

    } catch (err) {
        context.log.error('Error processing request', err);
        context.res = {
            status: 500,
            body: 'Internal Server Error',
        };
    }
}