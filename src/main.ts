import compression from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import {  Logger as NestLogger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { CustomExceptionsFilter } from '@shared/app/filters';
import { onRequestHook } from '@shared/app/hooks';
import { ValidationPipe } from '@shared/classValidator/pipes';
import { LoggerContext } from '@shared/enums';
import { IServerConfig, swaggerConfig } from '@src/config';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import { fastify } from 'fastify';
import qs from 'fastify-qs';
import hpropagate from 'hpropagate';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { join } from 'path';
import { AppModule } from './app.module';

void(async(): Promise<void> =>
{
    hpropagate({
        propagateInResponses: true
    });

    const fastifyInstance =  fastify();

    fastifyInstance.addHook('onRequest', onRequestHook);

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(fastifyInstance),
        {
            cors: false,
            bufferLogs: true,
            autoFlushLogs: true
        }
    );

    try
    {
        useContainer(app.select(AppModule), { fallback: true, fallbackOnErrors: true });

        const { port, prefix, url, version, whiteList, cookie, cors } = app
            .get<ConfigService>(ConfigService)
            .getOrThrow<IServerConfig>('server');

        app.useLogger(app.get(Logger));
        app.useGlobalInterceptors(new LoggerErrorInterceptor());
        app.useGlobalFilters(new CustomExceptionsFilter(app.get(HttpAdapterHost)));

        app.useStaticAssets({
            root: join(__dirname, '..', 'public'),
            prefix: '/public/'
        });

        app.useGlobalPipes(ValidationPipe());
        await app.register(compression);
        await app.register(fastifyCookie, { parseOptions: { httpOnly: true }, secret: cookie.secret });
        await app.register(qs);

        app.use(cookieParser());

        const _whiteList = whiteList.filter(u => u.length);
        _whiteList.push(url.web);
        _whiteList.push(url.api);

        app.enableCors({
            origin(origin, callback)
            {
                if (cors || !origin || _whiteList.some(u => u.includes(origin)))
                {
                    callback(null, true);
                }
                else
                {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        });

        app.enableVersioning({
            type: VersioningType.URI
        });

        const document = SwaggerModule.createDocument(
            app,
            swaggerConfig(url.api, prefix)
        );

        const swaggerUri = `${prefix}${version}/swagger`;

        SwaggerModule.setup(swaggerUri, app, document);

        app.setGlobalPrefix(prefix);

        await app.listen(port, '0.0.0.0');

        const appUrl = await app.getUrl();

        NestLogger.log(
            `Application is running on: ${appUrl}`,
            LoggerContext.BOOTSTRAP
        );

        NestLogger.log(
            `Documentation is running in: ${appUrl}${swaggerUri}`,
            LoggerContext.BOOTSTRAP
        );
    }
    catch (err)
    {
        await app.close();
        NestLogger.error(err, LoggerContext.BOOTSTRAP);
    }

    // eslint-disable-next-line no-undef
    async function closeGracefully(signal: NodeJS.Signals): Promise<void>
    {
        await app.close();
        process.kill(process.pid, signal);
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGINT', closeGracefully);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGTERM', closeGracefully);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGUSR2', closeGracefully);
})();
