import {
    CallHandler,
    ExecutionContext,
    Injectable, Logger,
    NestInterceptor
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseSerializer } from '@shared/classValidator/abstractClass';
import {
    SERIALIZER_TYPE_CLASS
} from '@shared/classValidator/decorators';
import { Serializer } from '@shared/classValidator/utils';
import { Observable, firstValueFrom, of, switchMap } from 'rxjs';

@Injectable()
export class InstantiateSerializerInterceptor implements NestInterceptor
{
    private readonly logger = new Logger(InstantiateSerializerInterceptor.name);

    constructor(
        private readonly reflector: Reflector
    )
    { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>|any>
    {
        const serializerClass:  { new (...args: unknown[]): BaseSerializer<any> } = this.reflector.getAllAndOverride(SERIALIZER_TYPE_CLASS, [
            context.getHandler()
        ]);

        return of(await Serializer(await firstValueFrom(next.handle()), serializerClass));
    }
}

