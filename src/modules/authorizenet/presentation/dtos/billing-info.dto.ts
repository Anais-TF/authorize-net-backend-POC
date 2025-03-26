import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class BillingInfoDto
{
    @IsString()
    @ApiProperty({
        description: 'First name',
        example: 'John'
    })
    public readonly firstName: string;

    @IsString()
    @ApiProperty({
        description: 'Last name',
        example: 'Doe'
    })
    public readonly lastName: string;

    @IsString()
    @ApiProperty({
        description: 'Company name',
        example: 'Acme Inc'
    })
    public readonly company: string;

    @IsString()
    @ApiProperty({
        description: 'Address',
        example: '1234 Main St'
    })
    public readonly address: string;

    @IsString()
    @ApiProperty({
        description: 'City',
        example: 'Springfield'
    })
    public readonly city: string;

    @IsString()
    @Length(2, 2)
    @ApiProperty({
        description: 'State',
        example: 'IL'
    })
    public readonly state: string;

    @IsString()
    @Length(5, 5)
    @ApiProperty({
        description: 'ZIP code',
        example: '62701'
    })
    public readonly zip: string;

    @IsString()
    @ApiProperty({
        description: 'Country',
        example: 'USA'
    })
    public readonly country: string;
}
