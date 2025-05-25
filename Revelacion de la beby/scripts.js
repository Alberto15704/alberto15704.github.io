document.addEventListener('DOMContentLoaded', () => {
  const btnEmpezar = document.getElementById('btn-empezar');
  const btnVerVideo = document.getElementById('btn-ver-video');
  const textoPresentacion = document.getElementById('texto-presentacion');
  const videoBebe = document.getElementById('video-bebe');
  const musica = document.getElementById('musica');
  const narracion = document.getElementById('narracion');
  const body = document.body;

  const secciones = {
    bienvenida: document.getElementById('bienvenida'),
    galeria: document.getElementById('galeria'),
    video: document.getElementById('video'),
    final: document.getElementById('final')
  };

  let seccionActual = 'bienvenida';

  function mostrarSeccion(id) {
    if (id === seccionActual) return; 

    const actual = secciones[seccionActual];
    const siguiente = secciones[id];

    actual.style.pointerEvents = 'none';
    actual.style.opacity = '0';
    actual.style.transform = 'scale(0.98)';

    setTimeout(() => {
      actual.classList.remove('activa');

      siguiente.classList.add('activa');
      siguiente.style.opacity = '0';
      siguiente.style.transform = 'scale(0.98)';

      void siguiente.offsetWidth;

      siguiente.style.pointerEvents = 'auto';
      siguiente.style.opacity = '1';
      siguiente.style.transform = 'scale(1)';

      seccionActual = id;

      if (id === 'final') {
        body.classList.add('final-active');
      } else {
        body.classList.remove('final-active');
      }
    }, 800);
  }

  btnVerVideo.disabled = true;

  const textoCompleto = `"Ser padres es aprender a amar sin medida.
No importa si es tu primer abrazo o el siguiente, cada momento es un milagro.
Confía en tu corazón, disfruta cada sonrisa y recuerda: el amor es lo que siempre guía el camino."
`;

  function escribirParrafo(elemento, texto, velocidad = 50) {
    let i = 0;
    function escribir() {
      if (i <= texto.length) {
        elemento.textContent = texto.substring(0, i++);
        setTimeout(escribir, velocidad);
      }
    }
    escribir();
  }

  function scrollSuaveHastaElemento(elementoObjetivo, velocidad = 10, paso = 10) {
    const destino = elementoObjetivo.getBoundingClientRect().top + window.scrollY;
    const intervalo = setInterval(() => {
      const distanciaRestante = destino - window.scrollY;
      if (distanciaRestante <= 0) {
        clearInterval(intervalo);
      } else {
        window.scrollBy(0, paso);
      }
    }, velocidad);
  }

  btnEmpezar.addEventListener('click', () => {
    mostrarSeccion('galeria');

    musica.volume = 0.3;
    musica.play().catch(() => {
      console.log("Interactúa para que el audio se reproduzca.");
    });

    narracion.play();

    escribirParrafo(textoPresentacion, textoCompleto);

    setTimeout(() => {
      scrollSuaveHastaElemento(textoPresentacion, 40, 2);
    }, 1000);

    narracion.onended = () => {
      musica.volume = 1;
      btnVerVideo.disabled = false;
    };
  });

  btnVerVideo.addEventListener('click', () => {
    mostrarSeccion('video');
    musica.pause();

    videoBebe.currentTime = 0;
    videoBebe.play().catch(() => {
      console.log("No se pudo reproducir el video automáticamente. Tal vez necesite interacción.");
    });
  });

  videoBebe.addEventListener('ended', () => {
    mostrarSeccion('final');
    musica.currentTime = 30;
    musica.volume = 1;
    musica.play();
  });
});
