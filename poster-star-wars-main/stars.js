 const numStars = 100;

for (let i = 0; i < numStars; i++) {
  let star = document.createElement("div"); 
  star.className = "star";
  const xy = getRandomPosition();
  star.style.top = xy[0] + 'px';
  star.style.left = xy[1] + 'px';
  document.body.append(star);
}

function getRandomPosition() { 
  const y = window.innerWidth;
  const x = window.innerHeight;
  const randomX = Math.floor(Math.random()*x);
  const randomY = Math.floor(Math.random()*y);
  return [randomX,randomY];
}
