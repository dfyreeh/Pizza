const sliderTrack = document.getElementById("sliderTrack");
const btnPrev = document.querySelector(".slider-btn.prev");
const btnNext = document.querySelector(".slider-btn.next");

let scrollAmount = 0;
let autoDirection = 1;
let autoSlideInterval = null;

function getCardWidth() {
  const card = sliderTrack.querySelector(".card-slider-item");
  return card ? card.offsetWidth + 16 : 216;
}

function slide(direction) {
  const cardWidth = getCardWidth();
  scrollAmount += direction * cardWidth * 2;

  const maxScroll = sliderTrack.scrollWidth - sliderTrack.offsetWidth;
  if (scrollAmount <= 0) {
    scrollAmount = 0;
    autoDirection = 1;
  } else if (scrollAmount >= maxScroll) {
    scrollAmount = maxScroll;
    autoDirection = -1;
  }

  sliderTrack.style.transform = `translateX(-${scrollAmount}px)`;
  updateButtons(maxScroll);
}

function manualSlide(direction) {
  autoDirection = direction;
  slide(direction);
}

function updateButtons(maxScroll) {
  btnPrev.disabled = scrollAmount === 0;
  btnNext.disabled = scrollAmount >= maxScroll;
}

function startAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => slide(autoDirection), 5000);
}

let startX = 0;
let isDragging = false;

sliderTrack.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

sliderTrack.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const diff = e.touches[0].clientX - startX;
  if (Math.abs(diff) > 50) {
    manualSlide(diff < 0 ? 1 : -1);
    isDragging = false;
  }
});

sliderTrack.addEventListener("touchend", () => {
  isDragging = false;
});

window.addEventListener("load", () => {
  slide(0);
  startAutoSlide();
});

window.addEventListener("resize", () => slide(0));

// 
document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll('#menu a');
  const sections = Array.from(menuLinks).map(link => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id);
  });

  function onScroll() {
    const scrollPosition = window.scrollY + 150; 

    let currentId = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        currentId = section.id;
      }
    });

    menuLinks.forEach(link => {
      const linkId = link.getAttribute('href').slice(1);
      link.classList.toggle('active', linkId === currentId);
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll();  
});