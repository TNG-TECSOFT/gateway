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
    @Headers('token') token: string,
    @Query() params: string ) {
    try {
      return await this.service.getBillableOrders(token, params, authorization);
    } catch (error) {
      throw new Error('Failed to retrieve billable orders');
    }
  }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/addOrderToBilling')
  async addOrdersToBilling(
    @Headers('token') token: string,
    @Body() body: AddOrderToBillingDto ) {
    try {
      return await this.service.addOrdersToBilling(token, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/getAllOrdersToBilling')
  async getAllOrdersToBilling(
    @Headers('token') token: string,
    @Query() params: string ) {
    try {
      return await this.service.getAllOrdersToBilling(token, params);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}