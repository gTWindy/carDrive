const canvas = document.getElementById("myCanvas");
canvas.width = 250;
canvas.height = 900;

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9, canvas.height);

const img = new Image();
img.src = 'imgs/car3.png'
const car = new MoveCar(90, 80, 36, 54, 0, img);

const carsCount = 6;
const cars = [];

for (let i = 0; i < carsCount; ++i) {
   cars[i] = new Car(20, (54 + 10) * i + 30, 36, 54, 0, img);
}

function animate() {
   car.update();
   canvas.height = window.innerHeight;

   road.draw(ctx);
   findCollisions(car, cars);

   for (let i = 0; i < carsCount; ++i) {
      cars[i].draw(ctx);
   }
   car.draw(ctx);
   requestAnimationFrame(animate);
}

img.onload = function () { 
   // Событие которое будет исполнено в момент когда изображение будет загружено
   animate();
}

function blockMove() {
   if (car.speed > 0 && !car.reverseBlock) {
      console.log('CrashF!!!');
      car.forwardBlock = true;
      car.speed = -car.speed / 2;
   }
   else if (car.speed < 0 && !car.forwardBlock) {
      console.log('CrashR!!!');
      car.reverseBlock = true;
      car.speed = -car.speed / 2;
   }
}

function findCollisions(car, cars) {
   ctx.beginPath();
   ctx.lineWidth = 1;
   ctx.strokeStyle = "blue";
   ctx.moveTo(car.leftUpX, car.leftUpY);
   ctx.lineTo(car.rightUpX, car.rightUpY);
   ctx.lineTo(car.rightDownX, car.rightDownY);
   ctx.lineTo(car.leftDownX, car.leftDownY);
   ctx.lineTo(car.leftUpX, car.leftUpY);
   ctx.stroke();

   //проверяем на столкновение с краями
   for (let i = 0; i < 4; ++i) {
      if (car.cornerPts[i].x < road.left || car.cornerPts[i].x > road.right 
         || car.cornerPts[i].y < road.top || car.cornerPts[i].y > road.bottom)
         {
            console.log('край')
            blockMove();
            return;
         }
   } 

   for (let i = 0; i < cars.length; ++i) {
      //алгоритм поиска пересечения прямоугольников
      for (let j = 0; j < 4; ++j) 
      {
         for (let k = 0; k < 4; ++k) 
         {
            if (intersect(car.cornerPts[j].x, car.cornerPts[j].y, car.cornerPts[(j+1)%4].x, car.cornerPts[(j+1)%4].y, cars[i].cornerPts[k].x , cars[i].cornerPts[k].y, cars[i].cornerPts[(k+1)%4].x , cars[i].cornerPts[(k+1)%4].y))
            {
               console.log('тачка')
               blockMove();
               return;
            }
         }
      }
   }
   //Стычек нет - освобождаем управление
   car.forwardBlock = car.reverseBlock = false;
}