document.addEventListener('DOMContentLoaded', () => {

  const pantallaCarga = document.getElementById('pantallaCarga');
  const contenidoPrincipal = document.getElementById('contenidoPrincipal');

  /* ===============================
     PANTALLA DE CARGA – SOLO 1 VEZ
     =============================== */
  const yaVisto = sessionStorage.getItem('pantallaCargaVista');

  if (pantallaCarga && contenidoPrincipal && !yaVisto) {

    contenidoPrincipal.style.display = 'none';

    setTimeout(() => {
      pantallaCarga.style.animation = 'fadeOut 1s forwards';

      setTimeout(() => {
        pantallaCarga.remove();
        contenidoPrincipal.style.display = 'block';
        contenidoPrincipal.classList.add('fade-in');

        sessionStorage.setItem('pantallaCargaVista', 'true');
      }, 1000);

    }, 2500);

  } else if (pantallaCarga) {
    pantallaCarga.remove();
  }

  /* ===============================
     TRANSICIÓN ENTRE PÁGINAS
     =============================== */
  const enlaces = document.querySelectorAll('a[href]:not([data-bs-toggle])');



  enlaces.forEach(enlace => {
    enlace.addEventListener('click', e => {

      const destino = enlace.getAttribute('href');

      if (
        destino.startsWith('#') ||
        destino.startsWith('http') ||
        enlace.hasAttribute('data-bs-toggle') ||
        enlace.target === '_blank'

      ) return;

      e.preventDefault();
      if (contenidoPrincipal) {
        contenidoPrincipal.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = destino;
        }, 500);
      } else {
        // Si no hay animación, redirige directo
        window.location.href = destino;
      }
    });
  });
});

/* ===============================
   PARALLAX DE FONDO
   =============================== */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const bg = document.querySelector('.background');
      if (!bg) return;

      const factor = window.innerWidth < 768 ? 0.15 : 0.25;
      const offset = window.pageYOffset * factor;
      bg.style.setProperty('--bg-offset', `${offset}px`);

      ticking = false;
    });

    ticking = true;
  }
});

const carousel = document.getElementById('carouselCafeterias');
const direccionTexto = document.getElementById('direccionTexto');
const mapaIframe = document.getElementById('mapaIframe');
const mapaLink = document.getElementById('mapaLink');

function actualizarInfo(slide) {
  const direccion = slide.dataset.direccion;
  const mapa = slide.dataset.mapa;

  direccionTexto.innerHTML = direccion.replace(',', '<br>');
  mapaIframe.src = `https://www.google.com/maps?q=${mapa}&output=embed`;
  mapaLink.href = `https://www.google.com/maps/search/?api=1&query=${mapa}`;
}

// Inicial
const slideInicial = carousel.querySelector('.carousel-item.active');
actualizarInfo(slideInicial);

// Al cambiar slide
carousel.addEventListener('slid.bs.carousel', (e) => {
  actualizarInfo(e.relatedTarget);
});