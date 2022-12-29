    // pobieramy elementy HTML za pomocą ich identyfikatorów
const ballElement = document.getElementById('ball');
    const holeElement = document.getElementById('hole');

    // ustawiamy położenie dziury losowo na ekranie
   // ustawiamy położenie dziury losowo na ekranie
holeElement.style.left = `${Math.random() * window.innerWidth}px`;
holeElement.style.top = `${Math.random() * window.innerHeight}px`;

// rejestrujemy event deviceorientation
window.addEventListener('deviceorientation', (e) => {
  // pętla animacji
  function animate() {
    // rejestrujemy kolejne wywołanie pętli
    requestAnimationFrame(animate);

    // pobieramy wartości pochylenia z obiektu event
    const { alpha, beta, gamma } = e;

    // aktualizujemy położenie kuli za pomocą pochylenia
    ballElement.style.left = `${alpha}px`;
    ballElement.style.top = `${beta}px`;

    // sprawdzamy, czy kula trafiła do dziury
    if (isOverlapping(ballElement, holeElement)) {
      alert('Kula trafiła do dziury!');
    }
  }

  // uruchamiamy pętlę animacji
  animate();
});

// funkcja sprawdzająca, czy dwa elementy HTML nakładają się na siebie
function isOverlapping(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    (rect1.bottom < rect2.top) || (rect1.top > rect2.bottom) || (rect1.right < rect2.left) || (rect1.left > rect2.right)
  );
}