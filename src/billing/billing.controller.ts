import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe, Headers, Post, Body, Delete, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Permissions } from '../common/permissions/permissions';
import { ROLE_ADMIN, ROLE_GENERAL } from '../common/constants/roles';
import { BillingService } from './billing.service';
import { HttpException, HttpStatus } from '@nestjs/common';

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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al recuperar órdenes', HttpStatus.INTERNAL_SERVER_ERROR);
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al agregar órdenes', HttpStatus.INTERNAL_SERVER_ERROR);
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al recuperar órdenes', HttpStatus.INTERNAL_SERVER_ERROR);
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al eliminar una orden', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}