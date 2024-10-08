import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { ROLE_ADMIN, ROLE_GENERAL } from 'src/auth/roles';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(public service: BillingService) {}

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @Get('/getOrders')
  async getBillingOrders(@Query() query: any): Promise<any> {
    const resultMap = await this.service.getBillingOrders(query);

    return {
      data: resultMap.get('orders'),
      count: resultMap.get('count'),
      total: resultMap.get('total'),
      page: resultMap.get('page'),
      pageCount: resultMap.get('pageCount'),
      totalAmount: resultMap.get('totalAmount'),
    };
  }
}