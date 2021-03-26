import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  hasErrors = true;
  bodyColor?: string;

  constructor() {
    const rgbString = window.getComputedStyle(document.body).color;
    this.bodyColor = rgbString
      .split('(')[1]
      .split(')')[0]
      .split(',')
      .map(part => part.trim())
      .map(part => {
        const hex = parseInt(part, 10).toString(16);
        return hex.length === 1
          ? `0${hex}`
          : hex;
      })
      .join('');
  }
}
