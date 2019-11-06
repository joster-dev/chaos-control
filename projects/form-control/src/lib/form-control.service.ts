import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {
  showNull = false;
  nullDisplay = '❓';
  nullTitle = 'Unknown';

  constructor() { }
}
