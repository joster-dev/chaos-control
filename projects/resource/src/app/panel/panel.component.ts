import { Component, OnInit, Input, } from '@angular/core';

import { Panel } from './panel';

@Component({
  selector: 'res-panel[panel]',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @Input() panel!: Panel;

  isMoreCode = false;

  constructor() { }

  ngOnInit(): void { }

  get codeHtml() {
    const attributes = this.panel.actions.reduce((acc, cur) => {
      if (cur.value === true || cur.value === false) {
        if (this.isMoreCode)
          return acc.concat(` [${cur.display}]="${cur.key}"`);
        if (cur.key === false)
          return acc.concat('');
        return acc.concat(` ${cur.display}`);
      }
      if (cur.key === cur.value[0] && !this.isMoreCode)
        return acc.concat('');
      return acc.concat(` [${cur.display}]="${cur.key}"`);
    }, [] as string[]);
    return `<fc-${this.panel.self.display}${attributes.join('')}></fc-${this.panel.self.display}>`;
  }
}
