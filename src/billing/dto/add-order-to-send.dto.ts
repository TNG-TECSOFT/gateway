import { IsNotEmpty, IsNumber, IsArray} from 'class-validator';
import { Type } from 'class-transformer';

class AddOrderToBillingDto {
    @IsNotEmpty()
    @IsNumber()
    shipperId: number;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    ordersIds: number[];
    
}

class AddOrderToBillingRequestDto {
    
    token?: string;
    orderInfo: AddOrderToBillingDto;
}

export {AddOrderToBillingDto, AddOrderToBillingRequestDto}