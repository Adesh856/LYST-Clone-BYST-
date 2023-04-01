
const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.slider-dots');
let currentIndex = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 33.33}%)`;
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.slider-dot');
  dots.forEach((dot) => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= 3) {
    currentIndex = 0;
  }
  updateSlider();
  updateDots();
}

function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 2;
  }
  updateSlider();
  updateDots();
}

function createDots() {
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlider();
      updateDots();
    });
    dotsContainer.appendChild(dot);
}
}

createDots();

setInterval(() => {
    nextSlide();
    }, 5000);
    