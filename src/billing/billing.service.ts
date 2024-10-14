import { firstValueFrom } from 'rxjs';
import { envs } from '../config/envs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { BillableOrdersRequestDto } from './dto/billable-orders-request.dto';
import { GetOrderToBillingDto, GetOrderToBillingParamsDto } from './dto/get-order-to-billing.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { AddOrderToBillingDto, AddOrderToBillingRequestDto } from './dto/add-order-to-send.dto';


@Injectable()
export class BillingService {
  constructor(
    @Inject(envs.billing_ms_name)
    private readonly client: ClientProxy,
  ) {}

  async getBillableOrders(authorization: string, params: string, authorization_core: string) {
    const request = new BillableOrdersRequestDto();      
      request.token = authorization;
      request.params = JSON.stringify(params);
      request.authorization_core = authorization_core;
    return await firstValueFrom(
      this.client.send<any, BillableOrdersRequestDto>('getBillableOrders', request)
    );
  }

  async addOrdersToBilling(authorization: string, body: AddOrderToBillingDto) {
    const request = new AddOrderToBillingRequestDto();      
      request.token = authorization;
      request.orderInfo = plainToClass(AddOrderToBillingDto, body);
    return await firstValueFrom(
      this.client.send<any, AddOrderToBillingRequestDto>('addOrderToBilling', request)
    );
  }

  async getAllOrdersToBilling(authorization: string, params: string) {
    const request = new GetOrderToBillingDto();      
      request.token = authorization;
      request.params = plainToInstance(GetOrderToBillingParamsDto, params);
    return await firstValueFrom(
      this.client.send<any, GetOrderToBillingDto>('getAllOrderToBilling', request)
    );
  }
}