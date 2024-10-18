import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe, Headers, Post, Body, Delete, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Permissions } from '../common/permissions/permissions';
import { ROLE_ADMIN, ROLE_GENERAL } from '../common/constants/roles';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly service: BillingService,
  ) { }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @Get('/getBillableOrders')
  async getBillableOrders(
    @Headers('authorization') authorization: string,
    @Headers('token') token: string,
    @Query() params: string) {
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
    @Headers('authorization') authorization: string,
    @Headers('token') token: string,
    @Body() params: string) {
    try {
      return await this.service.addOrdersToBilling(token, params, authorization);
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
    @Query() params: string) {
    try {
      const response = await this.service.getAllOrdersToBilling(token, params);
      return response
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete('/deleteOrderToBilling')
  async deleteOrderToBilling(
    @Headers('token') authorization: string,
    @Query('id') id: number,
  ) {
    try {
      const result = await this.service.deleteOrderToBilling(authorization, id);
      return result
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}