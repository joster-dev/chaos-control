import { isPrimitive } from './is-primitive';
import { Item } from './item.class';

export function isItem(item: Item): item is Item {
  return typeof (item) === 'object'
    && item !== null
    && isPrimitive(item.key)
    && typeof item.value === 'string';
}
