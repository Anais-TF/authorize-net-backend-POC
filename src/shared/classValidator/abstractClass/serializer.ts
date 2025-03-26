
export abstract class BaseSerializer<D = any>
{
    public build(data: D): Promise<void> | void
    {
        Object.assign(this, data);
    }
}


export const Serializer = BaseSerializer;
