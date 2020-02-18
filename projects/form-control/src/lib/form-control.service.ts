import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {
  showValidationErrors = true;
  showNull = false;
  showIcon = true;
  nullDisplay = '❓';
  nullTitle = 'Unknown';

  constructor() { }
}
