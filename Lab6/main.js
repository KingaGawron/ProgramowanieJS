 // pobieramy elementy HTML za pomocą ich identyfikatorów
 const ballElement = document.getElementById('ball');
 const holeElement = document.getElementById('hole');

 // ustawiamy położenie dziury losowo na ekranie
 holeElement.style.left = `${Math.random() * window.innerWidth}px`;
 holeElement.style.top = `${Math.random() * window.innerHeight}px`;

 // ustawiamy początkowe wartości prędkości kuli
let velocityX = 0;
let velocityY = 0;
// rejestrujemy pętlę animacji za pomocą requestAnimationFrame
function animate() {
    // aktualizujemy położenie kuli za pomocą prędkości
    ballElement.style.left = `${parseInt(ballElement.style.left) + velocityX}px`;
    ballElement.style.top = `${parseInt(ballElement.style.top) + velocityY}px`;
  
    // sprawdzamy, czy kula dotarła do granic ekranu
    if (parseInt(ballElement.style.left) < 0 || parseInt(ballElement.style.left) > window.innerWidth - 50) {
      velocityX = -velocityX;
    }
    if (parseInt(ballElement.style.top) < 0 || parseInt(ballElement.style.top) > window.innerHeight - 50) {
      velocityY = -velocityY;
    }
  
    // sprawdzamy, czy kula trafiła do dziury
    if (isOverlapping(ballElement, holeElement)) {
      alert('Kula trafiła do dziury!');
    }
  
    // rejestrujemy kolejne wywołanie pętli
    requestAnimationFrame(animate);
  }
  animate();
  
  // funkcja sprawdzająca, czy dwa elementy HTML nakładają się na siebie
  function isOverlapping(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
  
    return !(
      (rect1.bottom < rect2.top) || (rect1.top > rect2.bottom) || (rect1.right < rect2.left) || (rect1.left > rect2.right)
    );
  }
  
