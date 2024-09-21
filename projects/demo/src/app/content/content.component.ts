import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'demo-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  constructor(
    public ds: DataService,
  ) { }
}
