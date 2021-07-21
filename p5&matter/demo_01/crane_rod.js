class CraneRod extends Box {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.body.isStatic = true;
    let pushVec = Matter.Vector.create(0, -200);
    Matter.Body.translate(this.body, pushVec);
  }
  moveLeft() {
    let pushVec = Matter.Vector.create(-2, 0);
    Matter.Body.translate(this.body, pushVec);
  }
  moveRight() {
    let pushVec = Matter.Vector.create(2, 0);
    Matter.Body.translate(this.body, pushVec);
  }
  moveDown() {
    let pushVec = Matter.Vector.create(0, 2);
    Matter.Body.translate(this.body, pushVec);
  }
  moveUp() {
    let pushVec = Matter.Vector.create(0, -2);
    Matter.Body.translate(this.body, pushVec);
  }
}
