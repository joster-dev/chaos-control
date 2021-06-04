import { isNumber } from './is-number.function';
import { primitive } from './primitive.type';

export function isPrimitive(value: unknown): value is primitive {
  return typeof value === 'boolean'
    || isNumber(value)
    || typeof value === 'string';
}
