const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lmElement = document.getElementById("c1");
let lmBounds = lmElement.getBoundingClientRect();
let lm = {
  x: lmBounds.left,
  y: lmBounds.top,
  width: lmBounds.width,
  height: lmBounds.height
};

let g = false;

const rmElement = document.getElementById("c2");
let rmBounds = rmElement.getBoundingClientRect();
let rm = {
  x: rmBounds.left,
  y: rmBounds.top,
  width: rmBounds.width,
  height: rmBounds.height
};

const cmElement = document.getElementById("c3");
let cmBounds = cmElement.getBoundingClientRect();
let cm = {
  x: cmBounds.left,
  y: cmBounds.top,
  width: cmBounds.width,
  height: cmBounds.height
};

let numberOfParticles = 500;
let particlesArray = [];
const speed = 4;

class Particle {
  constructor() {
    this.radius = 10;

    this.ix = Math.random() * canvas.width;
    this.iy = Math.random() * canvas.height;
    /*
    console.log(this.ix + " " + + this.radius + " " + box.x)    
    */
    do {
      this.ix = Math.random() * canvas.width;
      this.iy = Math.random() * canvas.height;
    } while (collision(this.ix, this.iy, this.radius));

    this.x = this.ix;
    this.y = this.iy;
    this.speedX = Math.random() * speed - 1.5;
    this.speedY = Math.random() * speed - 1.5;

    this.color = "white";
    if (this.iy > 0.5 * canvas.height) this.color = "green";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > canvas.height || this.y + this.radius < 0) {
      this.speedY = -this.speedY;
    }
    if (collision(this.x, this.y, this.radius)) {
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;
    }

    if (this.color == "green" && g) {
      this.color = "red";
      this.speedX *= 5;
      this.speedY *= 5;
    }

    if (this.color == "red" && !g) {
      this.color = "green";
      this.speedX /= 5;
      this.speedY /= 5;
    }

    this.draw();
  }
}

function init() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", function () {
  reset();
});

document.getElementById("g").onclick = changeWeight;
document.getElementById("r").onclick = reset;

function changeWeight() {
  g = !g;
}

function reset() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];
  init();
}

function collision(x, y, radius) {
  if (
    (x - radius < lm.x + lm.width &&
      x + radius > lm.x &&
      y - radius < lm.y + lm.height &&
      y + radius > lm.y) ||
    (x - radius < rm.x + rm.width &&
      x + radius > rm.x &&
      y - radius < rm.y + rm.height &&
      y + radius > rm.y) ||
    (x - radius < cm.x + cm.width &&
      x + radius > cm.x &&
      y - radius < cm.y + cm.height &&
      y + radius > cm.y)
  ) {
    return true;
  }
  return false;
}

