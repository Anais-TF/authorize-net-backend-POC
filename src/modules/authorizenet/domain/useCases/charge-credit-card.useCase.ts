import { AuthorizenetService } from '@modules/authorizenet/infrastructure/services';
import { PaymentDto } from '@modules/authorizenet/presentation/dtos';
import { Injectable, Logger } from '@nestjs/common';

interface IChargeCreditCardParams
{
    dto: PaymentDto
}

@Injectable()
export class ChargeCreditCardUseCase
{
    private readonly logger = new Logger(ChargeCreditCardUseCase.name);

    constructor(
        private readonly authorizenetService: AuthorizenetService
    )
    {}

    async handle({ dto }: IChargeCreditCardParams)
    {
        this.logger.log('Handling useCase');
        const data = await this.authorizenetService.chargeCreditCard(dto);
        return JSON.parse(JSON.stringify(data));
    }
}
