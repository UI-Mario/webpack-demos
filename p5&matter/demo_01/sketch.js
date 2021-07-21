// Example based on https://www.youtube.com/watch?v=urR596FsU68
// 5.17: Introduction to Matter.js - The Nature of Code
// by @shiffman

// module aliases

var Engine = Matter.Engine,
  //    Render = Matter.Render,
  World = Matter.World,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;

let engine;
let world;
let boxes = [];
let circles = [];
let eggs = [];
let rod;
let grounds = [];
let mConstraint;

let canvas;
let sizes = [15, 25, 35, 45];

var img;

function preload() {
  img = loadImage("assets/imgs/me.png");
}

function setup() {
  canvas = createCanvas(400, 400);
  engine = Engine.create();
//   engine.world.gravity.y = 0;
  world = engine.world;
  //  Engine.run(engine);
  grounds.push(new Boundary(0, height / 2, 10, height));
  grounds.push(new Boundary(width, height / 2, 10, height));
//   grounds.push(new Boundary(200, 0, width, 10));
  grounds.push(new Boundary(200, height, width, 10));
  World.add(world, grounds);
  rod = new CraneRod(30, 20, 30, 500)
  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity() // for retina displays etc
  let options = {
    mouse: mouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

}

function draw() {
  background(51);
  Engine.update(engine);
  if(keyIsDown(LEFT_ARROW)){
    //code xyz
    console.log(123)
  }
  rod.show()
  if(keyIsDown(LEFT_ARROW)) {
      rod.moveLeft()
  }
  if(keyIsDown(RIGHT_ARROW)) {
    rod.moveRight()
  }
  if(keyIsDown(DOWN_ARROW)) {
    rod.moveDown()
  }
  if(keyIsDown(UP_ARROW)) {
    rod.moveUp()
  }
  for (let box of boxes) {
    box.show();
  }
  for (let circle of circles) {
    circle.show();
  }
  for (let egg of eggs) {
    egg.show();
  }
  for (let ground of grounds) {
    ground.show();
  }
}

function mousePressed() {
  let size = random(sizes);
  const flag = random()
  if (flag < 0.3) {
    boxes.push(new Box(mouseX, mouseY, size, size));
  } else if (flag < 0.6) {
    circles.push(new Circle(mouseX, mouseY, size / 2));
  } else {
    eggs.push(new Egg(img, mouseX, mouseY, size / 2))
  }
}
