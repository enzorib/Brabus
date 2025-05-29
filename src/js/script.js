(function() {
  'use strict'; // Enable strict mode

  // --- Menu Hamburguer --- //
  const hamMenu = document.getElementById('ham-menu');
  const navLinks = document.getElementById('nav-links');
  const nav = document.getElementById('nav');

  // Verifica se os elementos do menu existem
  if (hamMenu && navLinks && nav) {
    hamMenu.addEventListener('click', () => {
      hamMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
      nav.classList.toggle('active');
      // Adiciona acessibilidade: informa se o menu está expandido ou recolhido
      const isExpanded = navLinks.classList.contains('active');
      hamMenu.setAttribute('aria-expanded', isExpanded);
    });

    // Adiciona atributo inicial de acessibilidade para o menu
    hamMenu.setAttribute('aria-expanded', 'false');
    hamMenu.setAttribute('aria-controls', 'nav-links');
    navLinks.setAttribute('aria-labelledby', 'ham-menu');

  } else {
    console.error('Elementos do menu hamburguer não encontrados.');
  }

  // --- Botão Ver Mais (Aulas) --- //
  const toggleBtn = document.getElementById('toggleAulas');
  const aulasSection = document.querySelector('.aulas-section'); // Usando a section pai

  // Verifica se os elementos das aulas existem
  if (toggleBtn && aulasSection) {
    toggleBtn.addEventListener('click', () => {
      aulasSection.classList.toggle('active');
      const isActive = aulasSection.classList.contains('active');
      toggleBtn.textContent = isActive ? 'Voltar' : 'Ver Mais';
      // Acessibilidade: informa o estado do conteúdo expansível
      toggleBtn.setAttribute('aria-expanded', isActive);
    });
    // Adiciona atributo inicial de acessibilidade
    toggleBtn.setAttribute('aria-expanded', 'false');
    // Idealmente, o botão controlaria uma div específica com as aulas extras
    // toggleBtn.setAttribute('aria-controls', 'id-da-div-de-aulas-extras');
  } else {
    console.error('Botão "Ver Mais" ou seção de aulas não encontrados.');
  }

  // --- Carrossel de Planos --- //
  const prevBtn = document.querySelector('#planos .prev');
  const nextBtn = document.querySelector('#planos .next');
  const carouselInner = document.querySelector('#planos .carousel-inner');
  const items = document.querySelectorAll('#planos .carousel-item');

  // Verifica se os elementos do carrossel de planos existem
  if (prevBtn && nextBtn && carouselInner && items.length > 0) {
    let currentIndexPlanos = 0;
    const totalItemsPlanos = items.length;

    function showSlidePlanos(index) {
      // Corrige o índice para loop
      if (index >= totalItemsPlanos) {
        currentIndexPlanos = 0;
      } else if (index < 0) {
        currentIndexPlanos = totalItemsPlanos - 1;
      } else {
        currentIndexPlanos = index;
      }
      carouselInner.style.transform = `translateX(-${currentIndexPlanos * 100}%)`;

      // Atualiza a classe 'active' e acessibilidade (opcional, mas bom)
      items.forEach((item, i) => {
        item.classList.toggle('active', i === currentIndexPlanos);
        item.setAttribute('aria-hidden', i !== currentIndexPlanos);
      });
    }

    prevBtn.addEventListener('click', () => {
      showSlidePlanos(currentIndexPlanos - 1);
    });

    nextBtn.addEventListener('click', () => {
      showSlidePlanos(currentIndexPlanos + 1);
    });

    // Inicializa o primeiro slide
    showSlidePlanos(currentIndexPlanos);

  } else {
    console.error('Elementos do carrossel de planos não encontrados.');
  }

  // --- Carrossel de Depoimentos --- //
  const testimonials = document.querySelectorAll('.testimonial');
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  let currentIndexTestimonials = 0;
  let testimonialInterval;

  // Verifica se os elementos do carrossel de depoimentos existem
  if (testimonialCarousel && testimonials.length > 0) {
    function showNextTestimonial() {
      if (testimonials.length === 0) return; // Sai se não houver depoimentos

      testimonials[currentIndexTestimonials].classList.remove('active');
      testimonials[currentIndexTestimonials].setAttribute('aria-hidden', 'true');

      currentIndexTestimonials = (currentIndexTestimonials + 1) % testimonials.length;

      testimonials[currentIndexTestimonials].classList.add('active');
      testimonials[currentIndexTestimonials].setAttribute('aria-hidden', 'false');
    }

    function startTestimonialCarousel() {
        // Limpa intervalo anterior para evitar múltiplos timers
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(showNextTestimonial, 3500);
    }

    function stopTestimonialCarousel() {
        clearInterval(testimonialInterval);
    }

    // Inicializa o primeiro depoimento
    if (testimonials.length > 0) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === 0);
            t.setAttribute('aria-hidden', i !== 0);
        });
        startTestimonialCarousel();
    }

    // Pausa ao passar o mouse
    testimonialCarousel.addEventListener('mouseenter', stopTestimonialCarousel);
    testimonialCarousel.addEventListener('mouseleave', startTestimonialCarousel);

    // Pausa/Retoma com foco (acessibilidade)
    testimonialCarousel.addEventListener('focusin', stopTestimonialCarousel);
    testimonialCarousel.addEventListener('focusout', startTestimonialCarousel);

  } else {
    console.error('Elementos do carrossel de depoimentos não encontrados.');
  }

})(); // Fim da IIFE