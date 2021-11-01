import { defineComponent } from "vue";
// import renderComponent from "./renderComponent";

// const bulletComponent = defineComponent({
//   render() {
//     return <div>123</div>;
//   },
// });

type state = "init" | "mount" | "moving" | "pause" | "end";

interface position {
  left: number;
  top: number;
}

interface elProps {
  id: string;
  text: string;
  avatar: string;
}

export default class Bullet {
  public el: HTMLElement;
  public targetEl: HTMLElement;
  public unit: string = "px";
  public trackIndex: number;
  private id: string;
  private state: state;
  private position: position;
  private animationId: number | undefined;
  private speed = {
    width: 100,
    duration: 100
  }
  constructor(props: elProps) {
    if (!props) return;
    this.el = document.createElement("div");

    this.initEl(props);
  }
  initEl(props: elProps) {
    const defaultStyle = {};
    this.el.style["height"] = "40px";
    this.el.style["background"] = "lightgreen";
    this.el.style["display"] = "inline-flex";
    this.el.style["position"] = "absolute";
    this.el.style["whiteSpace"] = "nowrap"
    //
    const { text, avatar, id } = props;
    this.el.setAttribute("id", id);
    this.id = id;
    const textEl = document.createElement("div");
    textEl.style["width"] = "max-content"
    textEl.innerText = text;
    const avatarEl = document.createElement("img");
    avatarEl.setAttribute("src", avatar);
    //
    this.el.appendChild(avatarEl);
    this.el.appendChild(textEl);
    //
    this.state = "init";
  }
  mount(targetEl: HTMLElement, trackIndex:number, position: position, unit: string) {
    //
    this.position = position;
    this.unit = unit;
    this.targetEl = targetEl;
    this.trackIndex = trackIndex
    this.el.style["left"] = this.position.left + this.unit;
    //
    targetEl.appendChild(this.el);
    //
    this.state = "mount";
    const domEl = document.querySelector(`#${this.id}`);
    if (!domEl) {
      throw new Error("mount bullet error");
    }
    this.el = domEl as HTMLElement;
    //
    this.initListener();
  }
  move(duration: number, width:number) {
    this.state = "moving";
    this.speed = {
      width,
      duration
    }
    // debugger
    // FIXME:比较惨的是，这个函数返回的单位是px
    const { left: trackLeft, right: trackRight } =
      this.targetEl.getBoundingClientRect();
    const animation = () => {
      if (this.state !== "moving") return;

      if(this.isOutOfTrack()) {
        this.unmount()
        return
      }

      // const {left:bulletLeft} = this.el.getBoundingClientRect()
      // // 不应该由他来改变state成end
      this.position.left -= width / (duration / 16);
      this.el.style["left"] = this.position.left + this.unit;
      this.animationId = requestAnimationFrame(animation);
    };
    animation();
  }
  pause() {
    this.state = "pause";
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }
  initListener() {
    // 鼠标悬停，动画结束remove节点
    this.el.addEventListener("mouseenter", () => {
      this.pause();
    });
    this.el.addEventListener("mouseover", () => {
      this.pause();
    });
    this.el.addEventListener("mouseout", () => {
      this.state = "moving";
      const {duration, width} = this.speed
      this.move(duration, width);
    });
  }
  removeListener() {
    this.el.removeEventListener("mouseenter", this.pause);
    this.el.removeEventListener("mouseover", this.pause);
  }
  unmount() {
    this.targetEl.removeChild(this.el);
  }
  isOutOfTrack() {
    const { left: targetElLeft } = this.targetEl.getBoundingClientRect();
    const { right: elRight } = this.el.getBoundingClientRect();
    return elRight < targetElLeft;
  }
}
