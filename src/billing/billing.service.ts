import { firstValueFrom } from 'rxjs';
import { envs } from '../config/envs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { BillableOrdersRequestDto } from './dto/billable-orders-request.dto';

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
}