import { RequestMethod } from '@nestjs/common';
import { validateEnv } from '@src/validate-env';
import dotenv from 'dotenv';
dotenv.config();
import type { IConfig } from './config.interface';

validateEnv(process.env);

export default (): IConfig => ({
    environment: process.env.NODE_ENV,
    server: {
        url: {
            api: process.env.URL_API,
            web: process.env.URL_WEB
        },
        whiteList: process.env.WHITE_LIST,
        prefix: process.env.PREFIX,
        port: process.env.PORT,
        version: process.env.VERSION,
        session: {
            secret: process.env.SESSION_SECRET,
            salt: process.env.SESSION_SALT
        },
        cookie: {
            secret: process.env.COOKIE_SECRET,
            secure: process.env.COOKIE_SECURE,
            sameSite: process.env.COOKIE_SAME_SITE
        },
        locale: process.env.LOCALE,
        cors: process.env.CORS
    },
    logger: {
        colorize: process.env.LOGGER_COLORIZE,
        singleLine: process.env.LOGGER_SINGLE_LINE,
        exclude: [{ method: RequestMethod.ALL, path: 'logs' }],
        task: {
            deleteTraceLog: process.env.LOGGER_TASK_DELETE_TRACE_LOG
        }
    },
    cache: {
        socket: {
            host: process.env.CACHE_HOST,
            port: process.env.CACHE_PORT
        },
        password: process.env.CACHE_PASSWORD
    },
    serializer: {
        // excludePrefixes: ['_'],
        enableCircularCheck: true,
        excludeExtraneousValues: true,
        exposeDefaultValues: true
    },
    classValidator: {
        always: true,
        whitelist: true,
        strictGroups: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true
    },
    authorizenet: {
        apiLoginKey: process.env.AUTHORIZENET_API_LOGIN_KEY,
        transactionKey: process.env.AUTHORIZENET_TRANSACTION_KEY
    }
});
