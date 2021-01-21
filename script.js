const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lmElement = document.getElementById("c");
let lmBounds = lmElement.getBoundingClientRect();
let lm = {
  x: lmBounds.left,
  y: lmBounds.top,
  width: lmBounds.width,
  height: lmBounds.height
};

const rmElement = document.getElementById("d");
let rmBounds = rmElement.getBoundingClientRect();
let rm = {
  x: rmBounds.left,
  y: rmBounds.top,
  width: rmBounds.width,
  height: rmBounds.height
};

let numberOfParticles = 300;
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
    } while (
      (this.ix - this.radius < lm.x + lm.width &&
      this.ix + this.radius > lm.x &&
      this.iy - this.radius < lm.y + lm.height &&
      this.iy + this.radius > lm.y) ||
      (this.ix - this.radius < rm.x + rm.width &&
      this.ix + this.radius > rm.x &&
      this.iy - this.radius < rm.y + rm.height &&
      this.iy + this.radius > rm.y)
    );
    

    this.x = this.ix;
    this.y = this.iy;
    this.speedX = Math.random() * speed - 1.5;
    this.speedY = Math.random() * speed - 1.5;
  }
  draw() {
    ctx.fillStyle = "white";
    if(this.iy > .5 * canvas.height)
      ctx.fillStyle = "green";
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
      (this.x - this.radius < lm.x + lm.width &&
      this.x + this.radius > lm.x &&
      this.y - this.radius < lm.y + lm.height &&
      this.y + this.radius > lm.y) ||
      (this.x - this.radius < rm.x + rm.width &&
      this.x + this.radius > rm.x &&
      this.y - this.radius < rm.y + rm.height &&
      this.y + this.radius > rm.y)
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

