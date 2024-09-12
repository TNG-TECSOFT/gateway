import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBillingDto } from './dto/create-billing.dto';
import { firstValueFrom } from 'rxjs';

@Controller('billing')
export class BillingController {
  constructor(
    @Inject('BILLING_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @Get('/client/:clientId')
  async getClientData(@Param('clientId') clientId: string) {
    try {
      const response = await firstValueFrom(
        this.client.send<string, string>('getClientData', clientId),
      );
      return response;
    } catch (error) {
      console.error(
        'Error communicating with the microservice:',
        error.message,
      );
      throw new Error('Failed to retrieve client data');
    }
  }

  @Get('/product/:sku')
  async getProductData(@Param('sku') sku: string) {
    try {
      const response = await firstValueFrom(
        this.client.send<string, string>('getProductData', sku),
      );
      return response;
    } catch (error) {
      console.error(
        'Error communicating with the microservice:',
        error.message,
      );
      throw new Error('Failed to retrieve product data');
    }
  }

  @Post('/order')
  async createOrder(@Body() createOrderDto: CreateBillingDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('createOrder', createOrderDto),
      );
      return response;
    } catch (error) {
      console.error(
        'Error communicating with the microservice:',
        error.message,
      );
      throw new Error('Failed to create order');
    }
  }
}
