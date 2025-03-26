function isPromise(object: any): object is Promise<any>
{
    return object && Promise.resolve(object) === object;
}

function isFunction(func: any): func is () => void
{
    return typeof func === 'function' || func instanceof Function;
}

export type Handler = (err: any, context: any, ...args: any) => any;

export const CatchErrorFactory = (
    errorClassConstructor: any | Handler,
    handler?: Handler
) =>
{
    return (target: any, key: string, descriptor: PropertyDescriptor) =>
    {
        const { value } = descriptor;

        if (!handler)
        {
            handler = errorClassConstructor as Handler;
            errorClassConstructor = undefined as unknown as any;
        }
        descriptor.value = async function(...args: any[])
        {
            try
            {
                const response = value.apply(this, args);
                return isPromise(response) ? await response : Promise.resolve(response);
            }
            catch (error)
            {
                if (
                    isFunction(handler) &&
          (errorClassConstructor === undefined || error instanceof errorClassConstructor)
                )
                {
                    return handler.call(null, error, this, ...args);
                }

                throw error;
            }
        };

        return descriptor;
    };
};
