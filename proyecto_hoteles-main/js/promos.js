const botones = document.querySelectorAll('.ver-mas');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const info = boton.nextElementSibling; // selecciona el div .info-oculta
    info.classList.toggle('mostrar');

    // Cambia el texto del botón dinámicamente
    boton.textContent = info.classList.contains('mostrar') ? 'Ocultar' : 'Ver más';
  });
}