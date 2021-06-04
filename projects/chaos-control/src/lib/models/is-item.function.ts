import { isPrimitive } from './is-primitive.function';
import { Item } from './item.interface';

export function isItem(item: Item): item is Item {
  return typeof (item) === 'object'
    && item !== null
    && isPrimitive(item.key)
    && typeof item.value === 'string';
}
