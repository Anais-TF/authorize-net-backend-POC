import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard, IsString, Length, Matches } from 'class-validator';

export class PaymentInfoDto
{
    @IsString()
    @IsCreditCard()
    @ApiProperty({
        description: 'Credit card number',
        example: '378282246310005'
    })
    public readonly creditCardNumber: string;

    @IsString()
    @Length(3, 3)
    @ApiProperty({
        description: 'Code Verification Value',
        example: '124'
    })
    public readonly cvv: string;

    @IsString()
    @Matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
        message: 'expireDate must be in the format MM/YY'
    })
    @ApiProperty({
        description: 'Expiration date',
        example: '11/26'
    })
    public readonly expireDate: string;
}
