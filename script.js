
const sections = document.querySelectorAll('.fade-in-section');

const revealSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

const carouselContainer = document.querySelector('.carousel-container');
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const paginationContainer = document.querySelector('.carousel-pagination');

let currentIndex = 0;
let interval;

// Create pagination dots
carouselItems.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.classList.add('carousel-pagination-dot');
  if (index === 0) {
    dot.classList.add('active');
  }
  dot.addEventListener('click', () => {
    stopCarousel();
    showSlide(index);
    startCarousel();
  });
  paginationContainer.appendChild(dot);
});

const paginationDots = document.querySelectorAll('.carousel-pagination-dot');

function showSlide(index) {
  const width = carouselContainer.offsetWidth;
  carousel.style.transform = `translateX(-${index * width}px)`;
  currentIndex = index;

  // Update active dot
  paginationDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  showSlide(currentIndex);
}

function startCarousel() {
  interval = setInterval(nextSlide, 5000); // Change slides every 5 seconds
}

function stopCarousel() {
  clearInterval(interval);
}

prevButton.addEventListener('click', () => {
  stopCarousel();
  prevSlide();
  startCarousel();
});

nextButton.addEventListener('click', () => {
  stopCarousel();
  nextSlide();
  startCarousel();
});

const carouselObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCarousel();
    } else {
      stopCarousel();
    }
  });
});

carouselObserver.observe(carouselContainer);

window.addEventListener('resize', () => {
  showSlide(currentIndex);
});
