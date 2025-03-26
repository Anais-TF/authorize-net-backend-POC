import { ChargeCreditCardUseCase } from '@modules/authorizenet/domain/useCases';
import { PaymentDto } from '@modules/authorizenet/presentation/dtos';
import { Body, Controller, Logger, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
    path: 'authorizenet',
    version: '1'
})
@ApiTags('Exchange rate.')
export class AuthorizenetController
{
    private readonly logger = new Logger(AuthorizenetController.name);

    constructor(
        private readonly chargeCreditCardUseCase: ChargeCreditCardUseCase
    )
    {}

    @Post('charge-credit-card')
    // @Serializer(ExchangeRateSerializer)
    async chargeCreditCard(
        @Body() dto: PaymentDto
    )
    {
        this.logger.log('Getting exchange rate');
        return this.chargeCreditCardUseCase.handle({ dto });
    }
}
