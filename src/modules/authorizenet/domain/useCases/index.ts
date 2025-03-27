import { ChargeCreditCardUseCase } from './charge-credit-card.useCase';
import { GenerateFormUseCase } from './generate-form.useCase';

const useCases  = [
    ChargeCreditCardUseCase,
    GenerateFormUseCase
];

export {
    ChargeCreditCardUseCase,
    GenerateFormUseCase
};

export default useCases;
