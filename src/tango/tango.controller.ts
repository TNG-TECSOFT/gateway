import { Controller, Get, Headers, Query, UseGuards, Post, Body } from '@nestjs/common';
import { TangoService } from './tango.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { Permissions } from '../common/permissions/permissions';
import { ROLE_ADMIN, ROLE_GENERAL } from '../common/constants/roles';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { AuthService } from '../common/auth/auth.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('tango')
export class TangoController {
  constructor(
    private readonly service: TangoService,
    private readonly authService: AuthService,
  ) {}

  @Get('/checkHealth')
  async checkHealth() {
    try {
      return await this.service.checkHealth();
    } catch (error) {
      console.error(
        'Error communicating with the microservice:',
        error.message,
      );
      throw new Error('Failed to check health');
    }
  }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @Get('/getCustomerData')
  async getCustomerData(
    @Headers('authorization') authorization: string,
    @Query() query: CustomerQueryDto) {
    try {
      query.token = this.authService.getToken(authorization);
      return await this.service.getCustomerData(query);
    } catch (error) {
      throw new Error('Failed to retrieve customer data');
    }
  }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @Get('/getProductData')
  async getProductData(
    @Headers('authorization') authorization: string,
    @Query() query: ProductQueryDto) {
    try {
      query.token = this.authService.getToken(authorization);
      return await this.service.getProductData(query);
    } catch (error) {
      throw new Error('Failed to retrieve product data');
    }
  }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @Get('/getOrderData')
  async getOrderData(
    @Headers('authorization') authorization: string,
    @Query() query: OrderQueryDto) {
    try {
      query.token = this.authService.getToken(authorization);
      return await this.service.getOrderData(query);
    } catch (error) {
      throw new Error('Failed to retrieve order data');
    }
  }

  @Permissions(ROLE_ADMIN, ROLE_GENERAL)
  @UseGuards(AuthGuard)
  @Post('/createOrder')
  async createOrder(
    @Headers('authorization') authorization: string,
    @Body() orderData: CreateOrderDto) {
    try {
      orderData.token = this.authService.getToken(authorization);
      return await this.service.createOrder(orderData);
    } catch (error) {
      throw new Error('Failed to create order');
    }
  }
}
