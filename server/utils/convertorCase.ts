import { camelCase, snakeCase } from 'lodash';

export function toCamelCaseKeys<T extends Record<string, any>>(obj: T): any {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [camelCase(k), v])
    );
}

export function toSnakeCaseKeys<T extends Record<string, any>>(obj: T): any {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [snakeCase(k), v])
    );
}
