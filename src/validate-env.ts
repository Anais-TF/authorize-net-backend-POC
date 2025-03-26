import { stringToArray } from '@shared/utils';
import { bool, cleanEnv, host, makeValidator, num, port, str, url } from 'envalid';

const urls = makeValidator((input: string) =>
{
    const data = stringToArray(input, ',');

    if (Array.isArray(data))
    {
        try
        {
            data.forEach(d => new URL(d));
        }
        catch (e)
        {
            throw new Error('Invalid URLs');
        }
    }

    return data;
});


export const validateEnv =  (config: Record<string, any>): Record<string, any> =>
{
    const clean = cleanEnv(config, {
        NODE_ENV: str({
            choices: ['development', 'test', 'production', 'staging']
        }),

        // SERVER
        PROJECT_NAME: str({ default: 'base_repository' }),
        PORT: port({ default: 3000 }),
        URL_API: url({ default:'http://api.localhost' }),
        URL_WEB: url({ default: 'http://app.localhost' }),
        PREFIX: str({ default: '/api' }),
        VERSION: str({ default: '/v1' }),
        WHITE_LIST: urls({
            default: ['api.localhost', 'http://mail.localhost/'],
            example: 'http://localhost:3000,http://localhost:3001'
        }),
        CORS: bool({ default: false }),

        // LANG
        LOCALE: str({ default: 'en', choices: ['en', 'es'] }),

        // COOKIE
        COOKIE_SECRET: str({ default: 'secret' }),
        COOKIE_SECURE: bool({ default: false }),
        COOKIE_SAME_SITE: str({
            default: 'none', choices: ['none', 'strict', 'lax']
        }),

        // SESSION
        SESSION_SECRET: str({ default: 'secret' }),
        SESSION_SALT: str({ default: 'salt' }),

        // LOGGER
        LOGGER_COLORIZE: bool({ default: true }),
        LOGGER_SINGLE_LINE: bool({ default: false }),
        LOGGER_TASK_DELETE_TRACE_LOG: str({ default: '*/30 * * * *' }),

        // CACHE
        CACHE_HOST: str({ default: 'redis' }),
        CACHE_PORT: num({ default: 6379 }),
        CACHE_PASSWORD: str(),

        // AUTHORIZENET
        AUTHORIZENET_API_LOGIN_KEY: str(),
        AUTHORIZENET_TRANSACTION_KEY: str()
    });

    config = { ...config, ...clean };

    process.env = <any>{ ...process.env, ...config };

    return config;
};
