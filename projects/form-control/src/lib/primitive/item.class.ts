export class Item {
  key: boolean | number | string = 0;
  value = '';
  title?: string;
  small?: string;
  [x: string]: unknown;
}
