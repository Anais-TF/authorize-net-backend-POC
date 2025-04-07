import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { BillingInfoDto } from './billing-info.dto';
import { OrderDto } from './order.dto';

export class AcceptPaymentTransactionDto
{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nonce of the payment'
    })
    public readonly nonce: string;

    @IsObject()
    @ValidateNested()
    @Type(() => OrderDto)
    @ApiProperty({
        description: 'Order information'
    })
    public readonly order: OrderDto;

    @IsObject()
    @ValidateNested()
    @Type(() => BillingInfoDto)
    @ApiProperty({
        description: 'Billing information'
    })
    public readonly billingInfo: BillingInfoDto;
}
