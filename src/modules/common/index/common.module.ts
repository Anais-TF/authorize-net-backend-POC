import { I18nModule } from '@modules/common/i18n';
import { LoggerModule } from '@modules/common/logger';
import { StoreModule } from '@modules/common/store';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@shared/app/guards';
import { CacheInterceptor } from '@shared/app/interceptors';
import { ValidationGuard } from '@shared/classValidator/guards';
import { getMilliseconds } from '@shared/utils';
import { ICacheConfig } from '@src/config';
import { redisStore } from 'cache-manager-redis-yet';

@Global()
@Module({
    imports: [
        ScheduleModule.forRoot(),
        HttpModule,
        CacheModule.registerAsync({
            inject: [ConfigService],
            isGlobal: true,
            useFactory: (config: ConfigService) => ({
                store: redisStore,
                ...config.getOrThrow<ICacheConfig>('cache')
            })
        }),
        CacheModule.register({ isGlobal: true }),
        EventEmitterModule.forRoot({ global: true }),
        ThrottlerModule.forRoot({
            ttl: getMilliseconds('1m'),
            limit: 1000
        }),
        StoreModule,
        LoggerModule,
        I18nModule
    ],
    exports: [
        HttpModule
    ]
})
export class CommonModule
{
    static providers = [
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        { provide: APP_GUARD, useClass: ValidationGuard },
        { provide: APP_INTERCEPTOR, useClass: CacheInterceptor }
    ];
}
