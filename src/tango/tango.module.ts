import { Module } from '@nestjs/common';
import { TangoController } from './tango.controller';
import { TangoService } from './tango.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from '../common/interceptors/auth.interceptor';

@Module({
  controllers: [TangoController],
  providers: [TangoService, {
    provide: APP_INTERCEPTOR,
    useClass: AuthInterceptor
  }],
  imports:[
    ClientsModule.register([
      {
        name: envs.tango_ms_name,
        transport: Transport.TCP,
        options: {
          host: envs.tango_ms_host,
          port: envs.tango_ms_port
        }
      }
    ])
  ],
  exports: [TangoService]
})
export class TangoModule {}
