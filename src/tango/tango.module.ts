import { Module } from '@nestjs/common';
import { TangoController } from './tango.controller';
import { TangoService } from './tango.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { AuthService } from '../common/auth/auth.service';

@Module({
  controllers: [TangoController],
  providers: [TangoService, AuthService],
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
