import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class ItemDto
{
    @IsNumberString()
    @ApiProperty({
        description: 'Product id',
        example: '1'
    })
    public readonly id: string;

    @IsString()
    @ApiProperty({
        description: 'Product name',
        example: 'Product 1'
    })
    public readonly name: string;

    @IsString()
    @ApiProperty({
        description: 'Product description',
        example: 'Product 1'
    })
    public readonly description: string;

    @IsNumber()
    @ApiProperty({
        description: 'Product quantity',
        example: 2
    })
    public readonly quantity: number;

    @IsNumber()
    @ApiProperty({
        description: 'Product price',
        example: 20.00
    })
    public readonly price: number;
}
