import { isNumber } from './is-number';
import { primitive } from './primitive.type';

export function isPrimitive(value: unknown): value is primitive {
  return value === null
    || typeof value === 'boolean'
    || isNumber(value)
    || typeof value === 'string';
}
