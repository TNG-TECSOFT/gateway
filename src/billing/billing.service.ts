import { firstValueFrom } from 'rxjs';
import { envs } from '../config/envs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { BillableOrdersRequestDto } from './dto/billable-orders-request.dto';
import { AddOrderToBillingRequestDto } from './dto/add-order-to-send.dto';
import { GetOrderToBillingDto } from './dto/get-order-to-billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @Inject(envs.billing_ms_name)
    private readonly client: ClientProxy,
  ) {}

  async getBillableOrders(request: BillableOrdersRequestDto) {
    return await firstValueFrom(
      this.client.send<any, BillableOrdersRequestDto>('getBillableOrders', request)
    );
  }

  async addOrdersToBilling(request: AddOrderToBillingRequestDto) {
    console.log(request);
    return await firstValueFrom(
      this.client.send<any, AddOrderToBillingRequestDto>('addOrderToBilling', request)
    );
  }

  async getAllOrdersToBilling(request: GetOrderToBillingDto ) {
    return await firstValueFrom(
      this.client.send<any, GetOrderToBillingDto>('getAllOrderToBilling', request)
    );
  }
}