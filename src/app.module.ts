import { Module } from '@nestjs/common';
import { BillingModule } from './billing/billing.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from './config/envs';

@Module({
  imports: [
    BillingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
