import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { envs } from '../config/envs';
import { BillableOrdersRequestDto } from './dto/billable-orders-request.dto';
import { GetOrderToBillingDto, GetOrderToBillingParamsDto } from './dto/get-order-to-billing.dto';
import { DeleteOrderToBillingDto } from './dto/delete-order-to-billing.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class BillingService {
  constructor(
    @Inject(envs.billing_ms_name)
    private readonly client: ClientProxy,
  ) { }

  async getBillableOrders(authorization: string, params: string, authorization_core: string) {
    try {
      const request = new BillableOrdersRequestDto();
      request.token = authorization;
      request.params = JSON.stringify(params);
      request.authorization_core = authorization_core;
      return await firstValueFrom(
        this.client.send<any, BillableOrdersRequestDto>('getBillableOrders', request)
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Falló la comunicación con el microservicio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addOrdersToBilling(authorization: string, params: string, authorization_core: string) {
    try {
      const request = new BillableOrdersRequestDto();      
      request.token = authorization;
      request.params = JSON.stringify(params);
      request.authorization_core = authorization_core;
      console.log('Gateway - Service')
      return await firstValueFrom(
        this.client.send<any, BillableOrdersRequestDto>('addOrderToBilling', request)
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Falló la comunicación con el microservicio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllOrdersToBilling(authorization: string, params: string) {
    try {
      const request = new GetOrderToBillingDto();
      request.token = authorization;
      request.params = plainToInstance(GetOrderToBillingParamsDto, params);
      return await firstValueFrom(
        this.client.send<any, GetOrderToBillingDto>('getAllOrderToBilling', request)
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Falló la comunicación con el microservicio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOrderToBilling(authorization: string, id: number) {
    try {
      const request = new DeleteOrderToBillingDto();
      request.token = authorization;
      request.params = { id };
      const response = await firstValueFrom(
        this.client.send<any, DeleteOrderToBillingDto>('deleteOrderToBilling', request),
      );
      return response
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Falló la comunicación con el microservicio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}