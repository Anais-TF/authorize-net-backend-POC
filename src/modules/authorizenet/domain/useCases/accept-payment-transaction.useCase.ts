import { AuthorizenetService } from '@modules/authorizenet/infrastructure/services';
import { AcceptPaymentTransactionDto } from '@modules/authorizenet/presentation/dtos';
import { Injectable, Logger } from '@nestjs/common';

interface IAcceptPaymentTransactionParams
{
    dto: AcceptPaymentTransactionDto
}

@Injectable()
export class AcceptPaymentTransactionUseCase
{
    private readonly logger = new Logger(AcceptPaymentTransactionUseCase.name);

    constructor(
        private readonly authorizenetService: AuthorizenetService
    )
    {}

    async handle({ dto }: IAcceptPaymentTransactionParams)
    {
        this.logger.log('Handling useCase');
        const data = await this.authorizenetService.createAnAcceptTransaction(dto);
        return JSON.parse(JSON.stringify(data));
    }
}
