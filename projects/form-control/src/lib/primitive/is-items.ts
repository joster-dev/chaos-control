import { primitive } from './primitive.type';
import { KeyValue } from '@angular/common';
import { isPrimitive } from './is-primitive';

export function isItems(value: any): value is KeyValue<primitive, string>[] {
  return Array.isArray(value)
    && value.every((item: any) => isPrimitive(item.key) && typeof item.value === 'string');
}
