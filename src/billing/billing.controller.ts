import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe, Headers, Post, Body, } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Permissions } from '../common/permissions/permissions';
import { ROLE_ADMIN, ROLE_GENERAL } from '../common/constants/roles';
import { BillingService } from './billing.service';
import { BillableOrdersRequestDto } from './dto/billable-orders-request.dto';
import { AuthService } from '../common/auth/auth.service';
import { AddOrderToBillingDto, AddOrderToBillingRequestDto } from './dto/add-order-to-send.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { GetOrderToBillingDto, GetOrderToBillingParamsDto } from './dto/get-order-to-billing.dto';

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

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/addOrderToBilling')
  async addOrdersToBilling(
    @Headers('authorization') authorization: string,
    @Body() body: AddOrderToBillingDto ) {
    try {
      const request = new AddOrderToBillingRequestDto();      
      request.token = this.authService.getToken(authorization);
      request.orderInfo = plainToClass(AddOrderToBillingDto, body);
      return await this.service.addOrdersToBilling(request);
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
      const request = new GetOrderToBillingDto();      
      request.token = this.authService.getToken(authorization);
      request.params = plainToInstance(GetOrderToBillingParamsDto, params);
      return await this.service.getAllOrdersToBilling(request);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}