import { Injectable } from '@angular/core';
import { primitive } from './primitive.type';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {
  showValidationErrors = true;
  showNull = false;
  nullDisplay = '❓';
  nullTitle = 'Unknown';

  constructor() { }

  isPrimitive(value: any): value is primitive {
    return typeof value === 'string'
      || typeof value === 'number'
      || typeof value === 'boolean';
  }
}
