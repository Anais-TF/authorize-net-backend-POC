declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;

        // SERVER
        URL_API: string;
        URL_WEB: string;
        PREFIX: string;
        PORT: number;
        VERSION: string;
        WHITE_LIST: string[];
        CORS: boolean;

        // LANG
        LOCALE: 'en' | 'es';

        // COOKIE
        COOKIE_SECRET: string;
        COOKIE_SECURE: boolean;
        COOKIE_SAME_SITE: boolean | 'none' | 'lax' | 'strict';

        // SESSION
        SESSION_SECRET: string;
        SESSION_SALT: string;

        // LOGGER
        LOGGER_COLORIZE: boolean;
        LOGGER_SINGLE_LINE: boolean;
        LOGGER_TASK_DELETE_TRACE_LOG: string;

        // CACHE
        CACHE_HOST: string;
        CACHE_PORT: number
        CACHE_PASSWORD: string;

        // AUTHORIZENET
        AUTHORIZENET_API_LOGIN_KEY: string;
        AUTHORIZENET_TRANSACTION_KEY: string;
    }
}
