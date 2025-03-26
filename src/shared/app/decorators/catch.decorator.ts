import { CatchErrorFactory, Handler } from '@shared/app/factories';

export const Catch = (errorClassConstructor: any, handler: Handler) =>
    CatchErrorFactory(errorClassConstructor, handler);
