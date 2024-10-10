import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomerDTO } from './customer.dto';
import { OrderItemDTO } from './orderItem.dto';


export class CreateOrderDto {

    @IsDateString()
    Date: string;
  
    @IsNumber()
    Total: number;
  
    @IsNumber()
    @IsOptional()
    TotalDiscount?: number;
  
    @IsNumber()
    @IsOptional()
    PaidTotal?: number;
  
    @IsNumber()
    @IsOptional()
    FinancialSurcharge?: number;
  
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    WarehouseCode?: string;
  
    @IsString()
    @IsNotEmpty()
    SellerCode: string;
  
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    TransportCode?: string;
  
    @IsNumber()
    SaleConditionCode: number;
  
    @IsNumber()
    @IsOptional()
    InvoiceCounterfoil?: number;
  
    @IsNumber()
    @IsOptional()
    PriceListNumber?: number;
  
    @IsBoolean()
    @IsOptional()
    IvaIncluded?: boolean;
  
    @IsBoolean()
    @IsOptional()
    InternalTaxIncluded?: boolean;
  
    @IsString()
    @IsNotEmpty()
    OrderID: string;
  
    @IsString()
    @IsNotEmpty()
    OrderNumber: string;
  
    @IsBoolean()
    @IsOptional()
    ValidateTotalWithPaidTotal?: boolean;
  
    @ValidateNested()
    @Type(() => CustomerDTO)
    Customer: CustomerDTO;
  
    @IsBoolean()
    @IsOptional()
    CancelOrder?: boolean;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    OrderItems: OrderItemDTO[];
  

    @IsOptional()
    @IsString()
    token?: string;
}
