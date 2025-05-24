const hamMenu = document.getElementById('ham-menu');
const navLinks = document.getElementById('nav-links');
const nav = document.getElementById('nav');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    nav.classList.toggle('active');
});

const btn = document.getElementById('ver-mais');
const extraCards = document.getElementById('extra-cards');

btn.addEventListener('click', function() {
    if (extraCards.style.display === 'none') {
        extraCards.style.display = 'block';
        btn.textContent = 'VER MENOS';
    } else {
        extraCards.style.display = 'none';
        btn.textContent = 'VER MAIS';
    }
});


  const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');

let index = 0;

function showSlide(i) {
    if (i >= items.length) index = 0;
    if (i < 0) index = items.length - 1;
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
}

prev.addEventListener('click', () => {
    index--;
    showSlide(index);
});

next.addEventListener('click', () => {
    index++;
    showSlide(index);
});