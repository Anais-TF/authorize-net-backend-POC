import configuration from '@config/configuration';
import { AuthorizenetModule } from '@modules/authorizenet';
import { CommonModule } from '@modules/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResponseInterceptorProvider } from '@shared/app/providers';
import { SerializerInterceptorProvider } from '@shared/classValidator/providers';
import { validateEnv } from '@src/validate-env';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            cache: true,
            validate: validateEnv
        }),
        CommonModule,
        AuthorizenetModule
    ],
    controllers: [],
    providers: [
        ...CommonModule.providers,
        ResponseInterceptorProvider,
        SerializerInterceptorProvider
    ]
})
export class AppModule
{}
