import { Item } from './item.class';

export function isItem(value: unknown): value is Item {
  return value instanceof Item;
}
