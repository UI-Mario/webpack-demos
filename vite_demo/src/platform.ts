import Bullet from "./bullet";
import Track from "./track";

const DURATIONS = [4000, 5000, 6000]

export default class Platform {
  public el: HTMLElement;
  public tracksArray = [];
  constructor(el: HTMLElement) {
    this.el = el;
  }
  addBullet(bullet) {
    // 计算position
    const track = this.checkTrack()
    const duration = DURATIONS[Math.floor(Math.random() * DURATIONS.length)]
    track.addBullet(bullet, duration)
  }
  checkTrack() {
    const tracksLastBullet = [];
    for (const track of this.tracksArray) {
      if (track.isEmpty()) {
        return track;
      }
      tracksLastBullet.push(track.bulletArray[track.bulletArray.length - 1]);
    }
    let minRight = Infinity;
    let minRightBullet = null;
    tracksLastBullet.map((bullet) => {
      const { right } = bullet.el.getBoundingClientRect();
      if (right < minRight) {
        minRight = right;
        minRightBullet = bullet;
      }
    });
    return this.tracksArray[minRightBullet.trackIndex];
  }
  initTracks(num) {
    if (!num) {
      console.warn("please input correct tracks number");
      return;
    }
    const { top, bottom, left, right } = this.el.getBoundingClientRect();
    const unit = "px";
    const height = (bottom - top) / num;
    for (var i = 0; i < num; i++) {
      const track = new Track(i, i);
      track.mount(this.el, i * height, right - left, height, unit);
      this.tracksArray.push(track);
    }
  }
}
