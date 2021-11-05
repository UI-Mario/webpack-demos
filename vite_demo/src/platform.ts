import Bullet from "./bullet";
import Track from "./track";

// 只给三档速度
// 按理说速度跟文本长度有关，就没必要多个duration
// 但是多个效果比较好
const DURATIONS = [4000, 5000, 6000];

export default class Platform {
  public el: HTMLElement;
  public tracksArray:Array<Track> = [];
  constructor(el: HTMLElement) {
    this.el = el;
  }
  addBullet(bullet:Bullet) {
    // 计算position
    const track = this.checkTrack();
    const duration = DURATIONS[Math.floor(Math.random() * DURATIONS.length)];
    track.addBullet(bullet, duration);
    // TODO:buffer
  }
  checkTrack():Track {
    // 有空的就返回空的，不然就返回走得最远的
    // 如果速度动态，这方法就是错的
    const tracksLastBullet:Array<Bullet> = [];
    for (const track of this.tracksArray) {
      if (track.isEmpty()) {
        return track;
      }
      tracksLastBullet.push(track.bulletArray[track.bulletArray.length - 1]);
    }
    // solution1: 返回所有轨道中，最后一个弹幕走得最远的
    let minRight = Infinity;
    let minRightBullet = {
      trackIndex: 0
    };
    tracksLastBullet.map((bullet) => {
      const { right } = bullet.el.getBoundingClientRect();
      if (right < minRight) {
        minRight = right;
        minRightBullet = bullet;
      }
    });
    return this.tracksArray[minRightBullet.trackIndex];
    // solution2: 碰撞问题
  }
  initTracks(num:number) {
    if (!num) {
      console.warn("please input correct tracks number");
      return;
    }
    const { top, bottom, left, right } = this.el.getBoundingClientRect();
    const unit = "px";
    const height = (bottom - top) / num;
    for (var i = 0; i < num; i++) {
      const track = new Track(i, i, this.el);
      track.init(i * height, right - left, height, unit);
      this.tracksArray.push(track);
    }
  }
}
