import { Controller, Get } from '@nestjs/common';
const packageJson = require('../package.json');

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return `Welcome to UEA API Gateway Version: ${packageJson.version}!`;
  }
}