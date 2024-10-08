import { Module } from '@nestjs/common';
import { TangoModule } from './tango/tango.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TangoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
