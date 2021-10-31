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
  private id:string;
  private state: state;
  private position: position;
  private animationId: number | undefined;
  constructor(props: elProps) {
    if (!props) return;
    this.el = document.createElement("div");

    this.initEl(props);
  }
  initEl(props: elProps) {
    const defaultStyle = {};
    this.el.style["height"] = "40px";
    this.el.style["background"] = "lightblue";
    this.el.style["display"] = "inline-flex";
    this.el.style["position"] = "absolute";
    // 
    const { text, avatar, id } = props;
    this.el.setAttribute("id", id);
    this.id = id
    const textEl = document.createElement("div");
    textEl.innerText = text;
    const avatarEl = document.createElement("img");
    avatarEl.setAttribute("src", avatar);
    //
    this.el.appendChild(avatarEl);
    this.el.appendChild(textEl);
    //
    this.state = "init";
  }
  mount(targetEl: HTMLElement, position: position, unit: string) {
    //
    this.position = position;
    this.unit = unit;
    this.targetEl = targetEl;
    this.el.style["left"] = this.position.left + this.unit;
    //
    targetEl.appendChild(this.el);
    //
    this.state = "mount";
    const domEl = document.querySelector(`#${SPECIAL_ID}`);
    if (!domEl) {
      throw new Error("mount bullet error");
    }
    this.el = domEl as HTMLElement;
    //
  }
  move(duration: number) {
    this.state = "moving";
    this.initListener();
    // debugger
    // FIXME:比较惨的是，这个函数返回的单位是px
    const { left: trackLeft, right: trackRight } =
      this.targetEl.getBoundingClientRect();
    const animation = () => {
      if (this.state !== "moving") return;

      // const {left:bulletLeft} = this.el.getBoundingClientRect()
      // // 不应该由他来改变state成end
      this.position.left -= 1.2;
      this.el.style["left"] = this.position.left + this.unit;
      this.animationId = requestAnimationFrame(animation);
    };
    animation();
  }
  initListener() {
    // 鼠标悬停，动画结束remove节点
    this.el.addEventListener("mouseenter", () => {
      this.state = "pause";
      if(this.animationId){
        cancelAnimationFrame(this.animationId)
      this.animationId = undefined
      }
    });
    this.el.addEventListener("mouseover", () => {
      this.state = "pause";
      if(this.animationId){
        cancelAnimationFrame(this.animationId)
      this.animationId = undefined
      }
    });
    this.el.addEventListener("mouseout", () => {
      this.state = "moving";
      this.move()
      // 为什么会越来越快呢
    });
  }
}
