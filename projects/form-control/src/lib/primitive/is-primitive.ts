import { primitive } from './primitive.type';

export function isPrimitive(value: any): value is primitive {
  return typeof value === 'string'
    || typeof value === 'number'
    || typeof value === 'boolean';
}
