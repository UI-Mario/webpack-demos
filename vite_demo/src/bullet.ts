type state = "init" | "mount" | "moving" | "pause" | "end";

interface position {
  left: number;
  top: number;
}

export default class Bullet {
  public el: HTMLElement = document.createElement("div");
  public targetEl: HTMLElement | null = null;
  public unit: string = "px";
  public trackIndex: number = 0;
  public elWidth: number = 1;
  private state: state = "init";
  private position: position = {
    left: 0,
    top: 0,
  };
  private animationId: number | undefined;
  private speed = {
    width: 100,
    duration: 100,
  };
  private unmountTimeoutIndex:number = Infinity
  constructor(innerHTML: string) {
    if (!innerHTML) return;
    this.initEl(innerHTML);
  }
  initEl(innerHTML:string) {
    this.el.style["position"] = "absolute"
    //
    this.el.innerHTML = innerHTML
    //
    this.state = "init";
  }
  mount(
    targetEl: HTMLElement,
    trackIndex: number,
    position: position,
    unit: string
  ) {
    //
    this.position = position;
    this.unit = unit;
    this.targetEl = targetEl;
    this.trackIndex = trackIndex;
    this.el.style["left"] = this.position.left + this.unit;
    this.el.style["top"] = this.position.top + this.unit;
    //
    targetEl.appendChild(this.el);
    const { left, right } = this.el.getBoundingClientRect()
    this.elWidth = right - left
    //
    this.state = "mount";
    this.initListener();
  }
  move(duration: number, width: number) {
    this.state = "moving";
    this.speed = {
      width,
      duration,
    };
    // debugger
    // 性能太差了
    const animation = () => {
      if (this.state !== "moving") return;

      // TODO: 如果要考虑hover暂停，
      // 就只能通过getBoundingClientRect侧面计算duration
      this.unmountTimeoutIndex = setTimeout(() => {
        this.removeListener()
        this.unmount()
      }, duration + 1000)

      this.el.style["transition"] = `all ${duration}ms linear`
      this.el.style["willChange"] = `transform`
      setTimeout(() => {
        this.el.style["transform"] = `translate3d(-${this.position.left + this.elWidth}${this.unit},0,0)`
      })
    }
    animation()
  }
  pause() {
    if(this.unmountTimeoutIndex !== Infinity) {
      this.state = "pause";
      // clear unmount settimeout
      clearTimeout(this.unmountTimeoutIndex)
      this.unmountTimeoutIndex = Infinity
      // stop transition

    }
  }
  continueMove() {
    this.state = "moving";
    const { duration, width } = this.speed;
    this.move(duration, width);
  }
  // 弹幕数较少，可以考虑放在这
  initListener() {
    this.el.addEventListener("mouseenter", () => {
      this.pause()
    });
    this.el.addEventListener("mouseover", () => {
      this.pause()
    });
    this.el.addEventListener("mouseout", this.continueMove);
  }
  removeListener() {
    this.el.removeEventListener("mouseenter", this.pause);
    this.el.removeEventListener("mouseover", this.pause);
    this.el.removeEventListener("mouseout", this.continueMove);
  }
  unmount() {
    // TODO: dom节点的复用
    this.targetEl?.removeChild(this.el);
  }
}
