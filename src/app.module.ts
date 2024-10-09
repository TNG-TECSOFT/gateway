import { Module } from '@nestjs/common';
import { TangoModule } from './tango/tango.module';
import { AppController } from './app.controller';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    TangoModule,
    BillingModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
