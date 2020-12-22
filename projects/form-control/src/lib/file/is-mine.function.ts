import { mimeTypes } from './mime-types.const';
import { mime } from './mime.type';

export function isMimeArray(value: any): value is mime[] {
  if (!Array.isArray(value))
    return false;
  return value.every(item => mimeTypes.includes(item));
}
