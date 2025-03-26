import { SetMetadata, UseInterceptors, applyDecorators } from '@nestjs/common';
import { BaseSerializer } from '@shared/classValidator/abstractClass';
import {
    SetMethodToUseGroupSerializer
} from '@shared/classValidator/decorators/set-method-to-use-group-serializer.decorator';
import { SetScopeSerializerGroups } from '@shared/classValidator/decorators/set-scope-serializer-groups.decorator';
import { InstantiateSerializerInterceptor } from '@shared/classValidator/interceptors';

export const SERIALIZER_TYPE_CLASS = 'SERIALIZER_TYPE_CLASS';

declare interface ISerializerConfig  {
    groups?: string[];
    method?: 'combine' | 'replace';
}

function Serializer(transform: typeof BaseSerializer<any>): MethodDecorator;
function Serializer(transform: typeof BaseSerializer<any>, config: ISerializerConfig): MethodDecorator;
function Serializer(transform: typeof BaseSerializer<any>, { groups, method }: ISerializerConfig = {}): MethodDecorator
{
    const decorators = [
        SetMetadata(SERIALIZER_TYPE_CLASS, transform),
        UseInterceptors(InstantiateSerializerInterceptor)
    ];

    if (groups)
    {
        decorators.push(SetScopeSerializerGroups(...groups));
    }

    if (method)
    {
        decorators.push(SetMethodToUseGroupSerializer(method));
    }

    return applyDecorators(...decorators);
}


export { Serializer };
