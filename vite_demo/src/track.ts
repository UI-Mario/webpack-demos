export default class Track {
  private id: number;
  public index:number;
  private top: number;
  private height: number;
  private width:number = 100;
  private unit: string;
  public el: HTMLElement;
  public bulletArray: [] = [];

  constructor(id, index) {
    this.id = id;
    this.index = index
    this.el = document.createElement("div");
  }
  mount(targetEl: HTMLElement, top, width, height, unit) {
    this.el.style["width"] = "100%";
    this.el.style["height"] = height + unit;
    this.el.style["top"] = top + unit;
    this.el.style["background"] = "lightblue";
    // 加border会影响整体高度加起来不等于screen
    // this.el.style['border'] = '1px solid yellow'
    this.top = top;
    this.height = height;
    this.unit = unit;
    const {left, right} = targetEl.getBoundingClientRect()
    this.width = width

    targetEl.appendChild(this.el);
  }
  isEmpty() {
    this.bulletArray = this.bulletArray.filter(bullet => {
      return bullet.el.parentNode
    })
    return this.bulletArray.length === 0
  }
  addBullet(bullet, duration) {
    this.bulletArray.push(bullet);
    const position = {
      left: this.width,
      top: 0,
    };
    const unit = "px";
    bullet.mount(this.el, this.index, position, unit);
    bullet.move(duration, this.width)
  }
}
