import { BadRequestCustomException } from '@shared/app/exceptions';
import { ErrorModel } from '@shared/classValidator/models';
import { ValidationError, isArray } from 'class-validator';
export const MapperErrorModels = (errors: ValidationError[], initTrow = true) =>
{
    const validationModels: ErrorModel[] = [];

    if (isArray(errors) && errors.length)
    {
        for (const error of errors)
        {
            const validationModel = new ErrorModel(error);
            validationModels.push(validationModel);
        }
    }

    if (initTrow && validationModels.length)
    {
        throw new BadRequestCustomException(validationModels);
    }
};
