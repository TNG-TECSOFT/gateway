import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class GetOrderToBillingParamsDto {

    @IsOptional()
    sort: string;
    @IsOptional()
    order: string;
    @IsOptional()
    page: number;
    @IsOptional()
    limit: number;
    @IsString()
    shipperId: string;
    @IsOptional()
    product: string;
    @IsOptional()
    service: string;
    @IsOptional()
    tracking: string;
    @IsOptional()
    impositionPlace: string;
    @IsOptional()
    productSku: string;
}

class GetOrderToBillingDto {

    @IsString()
    token: string;

    @ValidateNested()
    @Type(() => GetOrderToBillingParamsDto)
    params: GetOrderToBillingParamsDto;
}

export { GetOrderToBillingParamsDto, GetOrderToBillingDto }