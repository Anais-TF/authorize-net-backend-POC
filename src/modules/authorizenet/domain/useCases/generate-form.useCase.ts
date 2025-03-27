import { AuthorizenetService } from '@modules/authorizenet/infrastructure/services';
import { PaymentIntentDto } from '@modules/authorizenet/presentation/dtos';
import { Injectable, Logger } from '@nestjs/common';

interface IGenerateFormParams
{
    dto: PaymentIntentDto
}

@Injectable()
export class GenerateFormUseCase
{
    private readonly logger = new Logger(GenerateFormUseCase.name);

    constructor(
        private readonly authorizenetService: AuthorizenetService
    )
    {}

    async handle({ dto }: IGenerateFormParams)
    {
        this.logger.log('Handling useCase');
        const data = await this.authorizenetService.generateFormToken(dto);
        return JSON.parse(JSON.stringify(data));
    }
}
