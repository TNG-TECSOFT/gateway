import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { AuthService } from '../common/auth/auth.service';

@Module({
  controllers: [BillingController],
  providers: [BillingService, AuthService],
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
