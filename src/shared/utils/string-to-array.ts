import { StringPrototypes, prototypeToString } from './prototype-to-string';

export const stringToArray = (value: string | string[], separator: string) =>
{
    let data = value;

    if (!prototypeToString(data, StringPrototypes.STRING) && !prototypeToString(data, StringPrototypes.ARRAY))
    {
        return value;
    }

    if (prototypeToString(data, StringPrototypes.STRING))
    {
        data = (data as string).split(separator);
    }

    return [...new Set(data)];
};
