import { primitive } from './primitive.type';

export interface Item {
  key: primitive;
  value: string;
  [x: string]: unknown;
}
