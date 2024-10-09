import { firstValueFrom } from 'rxjs';
import { envs } from '../config/envs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerData, ProductData, OrderData } from './dto/tango-response.dto';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class TangoService {
  constructor(
    @Inject(envs.tango_ms_name)
    private readonly client: ClientProxy,
  ) {}

  async checkHealth() {
    try {
      const response = await firstValueFrom(
        this.client.send<string, string>('checkHealth', 'Are you ok?')
      );
      return response;
    } catch (error) {
      console.error('Error communicating with the microservice:', error.message);
      throw new Error('Failed to check health');
    }
  }

  async getCustomerData(query: CustomerQueryDto) {
    console.log('Query:', query);
    return await firstValueFrom(
      this.client.send<CustomerData[], CustomerQueryDto>('getCustomerData', query)
    );
  }

  async getProductData(query: ProductQueryDto) {
    return await firstValueFrom(
      this.client.send<ProductData[], ProductQueryDto>('getProductData', query)
    );
  }

  async getOrderData(query: OrderQueryDto) {
    return await firstValueFrom(
      this.client.send<OrderData[], OrderQueryDto>('getOrderData', query)
    );
  }

  async createOrder(orderData: CreateOrderDto) {
    return await firstValueFrom(
      this.client.send('createOrder', orderData)
    );
  }
}