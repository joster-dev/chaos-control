import { primitive } from './primitive.type';

export function isPrimitive(value: any): value is primitive {
  return value === null
    || typeof value === 'boolean'
    || typeof value === 'number'
    || typeof value === 'string';
}
