import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // Fastify 응답 객체에 맞게 수정
        try {
            const status = exception.getStatus();
            const message = exception.getResponse();

            // Fastify 응답 객체는 .status 대신 .code 사용, .json 대신 .send 사용
            response.code(status).send({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message,
            });
        } catch (error) {
            response.code(500).send({
                statusCode: 500,
                timestamp: new Date().toISOString(),
                message: 'Internal server error',
            });
        }
    }
}
