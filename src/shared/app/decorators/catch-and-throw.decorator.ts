import { CatchErrorFactory, Handler } from '@shared/app/factories';

export const CatchAndThrow = (errorClassConstructor: any, throwClass: any) =>
{
    return CatchErrorFactory(errorClassConstructor, () =>
    {
        throw new throwClass();
    });
};

