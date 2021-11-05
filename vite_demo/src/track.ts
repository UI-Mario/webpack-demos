import Bullet from "./bullet";

export default class Track {
  private id: number;
  public index: number;
  private top: number = 0;
  private height: number = 0;
  private width: number = 100;
  private unit: string = "px";
  public targetEl: HTMLElement;
  public bulletArray:Array<Bullet> = [];

  // id暂时没用
  constructor(id: number, index: number, targetEl:HTMLElement) {
    this.id = id;
    this.index = index;
    this.targetEl = targetEl
  }
  init(
    top: number,
    width: number,
    height: number,
    unit: string
  ) {
    this.top = top;
    this.height = height;
    this.unit = unit;
    this.width = width;
  }
  isEmpty():Boolean {
    this.bulletArray = this.bulletArray.filter((bullet) => {
      return bullet.el.parentNode;
    });
    return this.bulletArray.length === 0;
  }
  addBullet(bullet:Bullet, duration:number) {
    this.bulletArray.push(bullet);
    const position = {
      left: this.width,
      top: this.index * this.height,
    };
    bullet.mount(this.targetEl, this.index, position, this.unit);
    bullet.move(duration, this.width);
  }
}
