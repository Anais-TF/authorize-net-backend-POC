import { Serializer } from '@shared/classValidator/abstractClass';
import { Expose } from 'class-transformer';

export class PaymentSerializer extends Serializer
{
    @Expose() default: string;
}
