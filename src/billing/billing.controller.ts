import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBillingDto } from './dto/create-billing.dto';

@Controller('billing')
export class BillingController {
  constructor(
    @Inject('BILLING_SERVICE')
    private readonly client: ClientProxy) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateBillingDto) {
    return this.client.send({cmd: 'createOrder'}, createOrderDto);
  }

  @Get('/client/:codCliente')
  getDatosClienteTango(@Param('codCliente') codCliente: string) {
    return this.client.send({ cmd: 'getDatosCliente' }, codCliente);
  }

  @Get('/product/:sku')
  getDatosProductsTango(@Param('sku') sku: string) {
    return this.client.send({ cmd: 'getDatosProduct' }, sku);
  }
}
