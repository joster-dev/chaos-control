export class Panel {
  constructor(
    public model: any,
    public selfActions: any[],
    public actions: PanelSlot[] = []
  ) { }
}

class PanelSlot {
  key: any;
  value: boolean | number[] | string[];
  display: string;
}
