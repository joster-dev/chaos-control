import { Injectable } from '@angular/core';
import { primitive } from './primitive/primitive.type';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {
  showValidationErrors = true;
  showNull = false;
  nullDisplay = '❓';
  nullTitle = 'Unknown';

  constructor() { }

}
