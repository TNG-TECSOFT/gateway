import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe, Headers, Post, Body, } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Permissions } from '../common/permissions/permissions';
import { ROLE_ADMIN, ROLE_GENERAL } from '../common/constants/roles';
import { BillingService } from './billing.service';
import { AddOrderToBillingDto } from './dto/add-order-to-send.dto';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly service: BillingService,
  ) {}

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @Get('/getBillableOrders')
  async getBillableOrders(
    @Headers('authorization') authorization: string,
    @Query() params: string ) {
    try {
      return await this.service.getBillableOrders(authorization, params);
    } catch (error) {
      throw new Error('Failed to retrieve billable orders');
    }
  }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/addOrderToBilling')
  async addOrdersToBilling(
    @Headers('authorization') authorization: string,
    @Body() body: AddOrderToBillingDto ) {
    try {
      return await this.service.addOrdersToBilling(authorization, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/getAllOrdersToBilling')
  async getAllOrdersToBilling(
    @Headers('authorization') authorization: string,
    @Query() params: string ) {
    try {
      return await this.service.getAllOrdersToBilling(authorization, params);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}