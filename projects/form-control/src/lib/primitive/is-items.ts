import { isItem } from './is-item';
import { Item } from './item.class';

export function isItems(value: unknown): value is Item[] {
  return Array.isArray(value) && value.every(item => isItem(item));
}
