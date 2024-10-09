import { Controller, Get, Query, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Permissions } from '../common/permissions/permissions';
import { ROLE_ADMIN, ROLE_GENERAL } from '../common/constants/roles';
import { BillingService } from './billing.service';
import { BillableOrdersRequestDto } from './dto/billable-orders-request.dto';
import { AuthService } from '../common/auth/auth.service';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly service: BillingService,
    private readonly authService: AuthService,
  ) {}

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @Get('/getBillableOrders')
  async getBillableOrders(
    @Headers('authorization') authorization: string,
    @Query() params: string ) {
    try {
      const request = new BillableOrdersRequestDto();      
      request.token = this.authService.getToken(authorization);
      request.params = JSON.stringify(params);
      return await this.service.getBillableOrders(request);
    } catch (error) {
      throw new Error('Failed to retrieve billable orders');
    }
  }
}