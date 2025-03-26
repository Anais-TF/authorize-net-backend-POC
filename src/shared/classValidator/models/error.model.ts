import { ValidationError, isArray } from 'class-validator';

export class ErrorModel
{
    public readonly property: string;
    public readonly constraints: Record<string, any>;
    public readonly children: ErrorModel[];

    constructor(errors: ValidationError)
    {
        this.property = errors.property;
        this.constraints = errors.constraints;

        if (isArray(errors.children) && errors.children.length)
        {
            this.children = [];
            errors.children.forEach(_children => this.children.push(new ErrorModel(_children)));
        }
    }
}
