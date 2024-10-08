import { Controller, Get, UseGuards, UseInterceptors, Body } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { ROLE_ADMIN, ROLE_GENERAL } from './common/constants/roles';
import { Permissions } from './common/permissions/permissions';
import { UserDataInterceptor } from './common/interceptors/userData.interceptor';
const packageJson = require('../package.json');

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return `Welcome to UEA API Gateway Version: ${packageJson.version}!`;
  }
}