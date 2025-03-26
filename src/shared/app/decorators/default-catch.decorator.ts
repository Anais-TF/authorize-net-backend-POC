import { CatchErrorFactory, Handler } from '@shared/app/factories';

export const DefaultCatch = (handler: Handler) => CatchErrorFactory(handler);
