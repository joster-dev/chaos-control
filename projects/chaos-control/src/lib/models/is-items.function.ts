import { isItem } from './is-item.function';
import { Item } from './item.interface';

export function isItems(value: Item[]): value is Item[] {
  return Array.isArray(value) && value.every(item => isItem(item));
}
