import { AcceptPaymentTransactionUseCase, ChargeCreditCardUseCase, GenerateFormUseCase } from '@modules/authorizenet/domain/useCases';
import { AcceptPaymentTransactionDto, PaymentDto, PaymentIntentDto } from '@modules/authorizenet/presentation/dtos';
import { Body, Controller, Logger, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
    path: 'authorizenet',
    version: '1'
})
@ApiTags('Authorize net.')
export class AuthorizenetController
{
    private readonly logger = new Logger(AuthorizenetController.name);

    constructor(
        private readonly chargeCreditCardUseCase: ChargeCreditCardUseCase,
        private readonly generateFormTokenUseCase: GenerateFormUseCase,
        private readonly acceptPaymentTransactionUseCase: AcceptPaymentTransactionUseCase
    )
    {}

    @Post('charge-credit-card')
    async chargeCreditCard(
        @Body() dto: PaymentDto
    )
    {
        this.logger.log('Charging the credit card');
        return this.chargeCreditCardUseCase.handle({ dto });
    }

    @Post('generate-form')
    async generateFormToken(
        @Body() dto: PaymentIntentDto
    )
    {
        this.logger.log('Getting exchange rate');
        return this.generateFormTokenUseCase.handle({ dto });
    }

    @Post('accept-transaction')
    async acceptTransaction(
       @Body() dto: AcceptPaymentTransactionDto
    )
    {
        this.logger.log('Accepting transaction');
        return this.acceptPaymentTransactionUseCase.handle({ dto });
    }
}
