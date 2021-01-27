export function isNumber(value: unknown, positiveFlag = false): value is number {
  return typeof value === 'number'
    && !isNaN(value)
    && (!positiveFlag || (positiveFlag && value > 0));
}
