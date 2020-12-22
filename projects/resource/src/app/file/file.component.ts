import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'res-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  example1: FileList | null = null;
  example1Label = 'Lorum ipsum';
  isExample1Disabled = false;
  isExample1Required = false;
  isExample1BrLeft = true;
  isExample1BrRight = true;

  example2: FileList | null = null;
  example2Label = 'Lorum ipsum';
  isExample2Disabled = false;
  isExample2Required = false;
  isExample2BrLeft = true;
  isExample2BrRight = true;

  constructor() { }
}
