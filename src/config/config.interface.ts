import { MiddlewareConfigProxy } from '@nestjs/common/interfaces';
import { ClassTransformOptions } from 'class-transformer/types/interfaces';
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions';

export interface IUriConfig
{
    api: string;
    web: string;
}

export interface ISessionConfig
{
    secret: string;
    salt: string;
}

export interface ICookieConfig
{
    secret: string;
    secure: boolean;
    sameSite: boolean | 'none' | 'lax' | 'strict';
}

export declare type AppLocale = 'en' | 'es';

export interface IServerConfig
{
    url: IUriConfig;
    prefix: string;
    version: string;
    port: number;
    whiteList: string[];
    session: ISessionConfig
    cookie: ICookieConfig
    locale: AppLocale;
    cors: boolean;
}

export interface ILoggerConfig
{
    singleLine: boolean;
    colorize: boolean;
    exclude: Parameters<MiddlewareConfigProxy['exclude']>;
    task: {
        deleteTraceLog: string;
    }
}

export interface ICacheConfig
{
    socket: {
        host: string;
        port: number;
    };
    password: string;
}

export interface IAuthorizenetConfig
{
    apiLoginKey: string;
    transactionKey: string;
}

export interface IConfig {
    environment: string;
    server: IServerConfig;
    logger: ILoggerConfig;
    cache: ICacheConfig;
    serializer: Partial<ClassTransformOptions>;
    classValidator: ValidatorOptions;
    authorizenet: IAuthorizenetConfig;
}
