class Egg {
  constructor(img, x, y, r) {
    let options = {
      friction: 0.3,
      restitution: 0.6,
    };
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.r = r;
    this.img = img
    Matter.World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    image(img, 0, 0, this.r * 2, this.r * 2);
    pop();
  }

  move() {
    let pushVec = Matter.Vector.create(-2, 0)
    Matter.Body.translate(this.body, pushVec)
  }
}
