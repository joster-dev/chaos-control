export class Panel {
  constructor(
    public self: PanelSlot,
    public actions: PanelSlot[] = []
  ) { }
}

class PanelSlot {
  key: any;
  value: boolean | number[] | string[];
  display: string;
}
