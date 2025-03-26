import { ApiProperty } from '@nestjs/swagger';
import { ILocalMessage } from '@shared/app/utils';
import { BaseSerializer } from '@shared/classValidator/abstractClass';
import { Expose } from 'class-transformer';

export class LocalMessageSerializer extends BaseSerializer implements ILocalMessage
{
    @ApiProperty({ example: 'Example message' })
    @Expose() message: string;

    @ApiProperty({ example: 'messages.example.message' })
    @Expose() messageCode: string;

    @ApiProperty()
    @Expose() args?: object;
}
