let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

window_width = window.innerWidth;
window_height = window.innerHeight;

canvas.width = window_width;
canvas.height = window_height;

class Circle {
  constructor(xpos, ypos, radius, speed) {
    this.position_x = xpos;
    this.position_y = ypos;
    this.radius = radius;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.lineWidth = 5;
    context.arc(this.position_x, this.position_y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
  }

  update() {
    this.draw(context);
    //linie do innych kółek, jeśli są blisko
    for (let i = 0; i < all_circles.length; i++) {
      let otherCircle = all_circles[i];
      if (this !== otherCircle) {
        // usuwanie linii do samego siebie
        let distance = getDistance(
          this.position_x,
          this.position_y,
          otherCircle.position_x,
          otherCircle.position_y
        );
        if (distance < 200) {
          // linie, jeśli odległość jest mniejsza niż 200
          context.beginPath();
          context.moveTo(this.position_x, this.position_y);
          context.lineTo(otherCircle.position_x, otherCircle.position_y);
          context.stroke();
          context.closePath();
        }
      }
    }
    if (this.position_x + this.radius > window_width) {
      this.dx = -this.dx;
    }

    if (this.position_x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.position_y - this.radius < 0) {
      this.dy = -this.dy;
    }

    if (this.position_y + this.radius > window_height) {
      this.dy = -this.dy;
    }

    this.position_x += this.dx;
    this.position_y += this.dy;
  }
}

let getDistance = function (xpos1, ypos1, xpos2, ypos2) {
  var result = Math.sqrt(
    Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2)
  );
  return result;
};

let randomNumber = function (min, max) {
  var result = Math.random() * (max - min) + min;
  return result;
};

var all_circles = [];

for (var i = 0; i < 10; i++) {
  var radius = 30;
  var random_x = randomNumber(radius, window_width - radius);
  var random_y = randomNumber(radius, window_height - radius);
  let random_speed = randomNumber(1, 3);
  for (var a = 0; a < all_circles.length; a++) {
    if (
      getDistance(
        random_x,
        random_y,
        all_circles[a].position_x,
        all_circles[a].position_y
      ) -
        radius -
        all_circles[a].radius <
      0
    ) {
      random_x = randomNumber(radius, window_width - radius);
      random_y = randomNumber(radius, window_height - radius);
      a = -1; // resetuj indeks, aby sprawdzić wszystkie kółka ponownie
    }
  }

  let my_circle = new Circle(random_x, random_y, radius, random_speed);
  all_circles.push(my_circle);
}

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  context.clearRect(0, 0, window_width, window_height);

  all_circles.forEach((element) => {
    element.update();
  });
};

updateCircle();
