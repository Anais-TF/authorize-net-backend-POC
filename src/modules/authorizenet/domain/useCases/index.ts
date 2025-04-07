import { AcceptPaymentTransactionUseCase } from './accept-payment-transaction.useCase';
import { ChargeCreditCardUseCase } from './charge-credit-card.useCase';
import { GenerateFormUseCase } from './generate-form.useCase';

const useCases  = [
    ChargeCreditCardUseCase,
    GenerateFormUseCase,
    AcceptPaymentTransactionUseCase
];

export {
    ChargeCreditCardUseCase,
    GenerateFormUseCase,
    AcceptPaymentTransactionUseCase
};

export default useCases;
