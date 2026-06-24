import { NgModule } from '@angular/core';
import { IconComponent, IconStackComponent } from '@joster-dev/icon';

import {
  ChoiceComponent,
  ColorComponent,
  FileComponent,
  NumberComponent,
  ReadonlyComponent,
  SelectComponent,
  TextComponent,
} from './components';
import { BusyDirective } from './directives';

// The components and directives are standalone; this module is kept purely as a
// convenience aggregator so existing consumers can keep importing
// `ChaosControlModule`. New consumers can import the standalone pieces directly.
const PUBLIC_DECLARABLES = [
  ReadonlyComponent,
  ChoiceComponent,
  ColorComponent,
  FileComponent,
  NumberComponent,
  TextComponent,
  SelectComponent,
  BusyDirective,
  IconComponent,
  IconStackComponent,
];

@NgModule({
  imports: PUBLIC_DECLARABLES,
  exports: PUBLIC_DECLARABLES,
})
export class ChaosControlModule { }
