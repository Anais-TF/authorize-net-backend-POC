import { HttpStatus, HttpException as _HttpException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class HttpException extends _HttpException
{
    private readonly errorMessage: string;

    constructor(private readonly statusCode: HttpStatus, private readonly errorCode: string, private readonly args?: object)
    {
        const errorMessage: string = I18nContext.current()?.translate(errorCode, {
            args
        }) ?? null;

        super(
            {
                errorCode,
                errorMessage
            },
            statusCode
        );

        this.errorMessage = errorMessage;
    }
}
