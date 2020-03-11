import { Injectable } from '@angular/core';

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
