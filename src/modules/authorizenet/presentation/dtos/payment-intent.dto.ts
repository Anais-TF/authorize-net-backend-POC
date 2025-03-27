import { BillingInfoDto } from '@modules/authorizenet/presentation/dtos/billing-info.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

export class PaymentIntentDto
{
    /* @IsObject()
    @ValidateNested()
    @Type(() => BillingInfoDto)
    @ApiProperty({
        description: 'Billing information'
    })
    public readonly billingInfo: BillingInfoDto;*/

    /*  @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Customer email'
    })
    public readonly customerEmail: string;*/

    @IsNumber()
    @ApiProperty({
        description: 'Amount of the order',
        example: 40.00
    })
    public readonly amount: number;
}
