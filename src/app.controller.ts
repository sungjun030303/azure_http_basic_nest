import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //testing
  // http://192.168.1.70:7071/api/database-uri にアクセスした時に変数の値を確認出来る API を追加
  @Get('database-uri')
  getDatabaseURI(): string {
    return process.env.MONGODB_URI;
  }

}
