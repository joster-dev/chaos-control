import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  colorStyleHexString(element: HTMLElement): string {
    return window.getComputedStyle(element).color
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
