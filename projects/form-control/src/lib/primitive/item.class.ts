import { primitive } from './primitive.type';

export class Item {
  key: primitive = 0;
  value = '';
  title?: string;
  small?: string;
  [x: string]: unknown;
}
