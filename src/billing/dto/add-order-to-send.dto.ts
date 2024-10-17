import { IsNotEmpty, IsNumber, IsArray, IsOptional} from 'class-validator';
import { Type } from 'class-transformer';

class AddOrderToBillingDto {
    @IsNotEmpty()
    @IsNumber()
    shipperId: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    ordersIds: number[];
    
    
}

class AddOrderToBillingRequestDto {
    
    token?: string;
    orderInfo: AddOrderToBillingDto;
    params: string;
    authorization_core: string;
}

export {AddOrderToBillingDto, AddOrderToBillingRequestDto}