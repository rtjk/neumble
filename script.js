const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const boxElement = document.getElementById("box1");
let boxBounds = boxElement.getBoundingClientRect();
let box = {
  x: boxBounds.left,
  y: boxBounds.top,
  width: boxBounds.width,
  height: boxBounds.height
};

let numberOfParticles = 300;
let particlesArray = [];
const speed = 4;

class Particle {
  constructor() {
    this.ix = Math.random() * canvas.width;
    this.iy = Math.random() * canvas.height;
    this.x = this.ix;
    this.y = this.iy;
    this.radius = 10;
    this.speedX = Math.random() * speed - 1.5;
    this.speedY = Math.random() * speed - 1.5;
  }
  draw() {
    ctx.fillStyle = "white";
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
    if (
      this.x < box.x + box.width &&
      this.x + this.radius > box.x &&
      this.y < box.y + box.height &&
      this.y + this.radius > box.y
    ) {
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;
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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];
  init();
});

