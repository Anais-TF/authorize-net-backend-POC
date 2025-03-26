import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { BillingInfoDto } from './billing-info.dto';
import { OrderDto } from './order.dto';
import { PaymentInfoDto } from './payment-info.dto';
import { ShippingAddressDto } from './shipping-address.dto';

export class PaymentDto
{
    @IsObject()
    @ValidateNested()
    @Type(() => PaymentInfoDto)
    @ApiProperty({
        description: 'Payment information'
    })
    public readonly paymentInfo: PaymentInfoDto;

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

    @IsObject()
    @ValidateNested()
    @Type(() => ShippingAddressDto)
    @ApiProperty({
        description: 'Shipping address information'
    })
    public readonly shippingAddress: ShippingAddressDto;
}
