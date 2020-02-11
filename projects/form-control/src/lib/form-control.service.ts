import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {
  showNull = false;
  showIcon = true;
  nullDisplay = '❓';
  nullTitle = 'Unknown';

  constructor() { }
}
