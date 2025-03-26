import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { ItemDto } from './item.dto';

export class OrderDto
{
    @IsString()
    @ApiProperty({
        description: 'Number of the order',
        example: 'INV-2134'
    })
    public readonly number: string;

    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    @ApiProperty({
        description: 'Items of the order',
        isArray: true,
        type: ItemDto
    })
    public readonly items: ItemDto[];

    @IsNumber()
    @ApiProperty({
        description: 'Total of the order',
        example: 40.00
    })
    public readonly total: number;

    @IsNumber()
    @ApiProperty({
        description: 'Tax of the order',
        example: 0
    })
    public readonly tax: number;
}
