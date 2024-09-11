import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';

@Module({
  controllers: [BillingController],
  providers: [],
  imports:[
    ClientsModule.register([
      {
        name: 'BILLING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envs.host,
          port: envs.ms_port
        }
      }
    ])
  ]
})
export class BillingModule {}
