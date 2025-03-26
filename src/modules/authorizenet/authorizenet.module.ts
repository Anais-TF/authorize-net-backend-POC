import { Module } from '@nestjs/common';
import useCases from './domain/useCases';
import infraServices from './infrastructure/services';
import controllers from './presentation/controllers';

@Module({
    controllers: [...controllers],
    providers: [
        ...useCases,
        ...infraServices
    ]
})
export class AuthorizenetModule
{}
