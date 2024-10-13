import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { envs } from '../config/envs';
import { AuthInterceptor } from '../common/interceptors/auth.interceptor';

@Module({
  controllers: [BillingController],
  providers: [BillingService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    }],
  imports: [
    ClientsModule.register([
      {
        name: envs.billing_ms_name,
        transport: Transport.TCP,
        options: {
          host: envs.billing_ms_host,
          port: envs.billing_ms_port
        }
      }
    ])
  ],
  exports: [BillingService]
})
export class BillingModule {}
