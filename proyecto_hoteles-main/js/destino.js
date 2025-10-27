// ===========================================
// 🌍 Catálogo con mapa y barra de búsqueda
// ===========================================

// Lista de hoteles registrados
const hoteles = [
  { nombre: "Hotel Centro Histórico - San Salvador", coords: [13.6929, -89.2182] },
  { nombre: "Hotel Playa del Sol - Costa del Sol", coords: [13.2, -88.9] },
  { nombre: "Hotel de Montaña - Chalatenango", coords: [14.0, -89.15] },
  { nombre: "Hotel Colonial - Santa Ana", coords: [13.9945, -89.5597] },
  { nombre: "Hotel Las Palmas - La Libertad", coords: [13.4833, -89.3222] },
  { nombre: "Hotel Azul del Cielo - Sonsonate", coords: [13.7167, -89.7333] }
];

// Inicializar mapa centrado en El Salvador
const map = L.map("map").setView([13.6929, -89.2182], 8);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Agregar marcadores al mapa
const marcadores = hoteles.map(hotel => {
  const marker = L.marker(hotel.coords)
    .addTo(map)
    .bindPopup(`<b>${hotel.nombre}</b><br><a href="destino.html?nombre=${encodeURIComponent(hotel.nombre)}&lat=${hotel.coords[0]}&lng=${hotel.coords[1]}">Ver ubicación</a>`);
  return { ...hotel, marker };
});

// ==============================
// 🔎 Función de búsqueda
// ==============================
document.getElementById("btnBuscar").addEventListener("click", buscarHotel);
document.getElementById("busqueda").addEventListener("keypress", e => {
  if (e.key === "Enter") buscarHotel();
});

function buscarHotel() {
  const texto = document.getElementById("busqueda").value.trim().toLowerCase();
  if (!texto) {
    alert("Escribe el nombre de un hotel para buscar.");
    return;
  }

  const hotel = marcadores.find(h => h.nombre.toLowerCase().includes(texto));

  if (hotel) {
    map.setView(hotel.coords, 13);
    hotel.marker.openPopup();
  } else {
    alert("No se encontró ningún hotel con ese nombre.");
  }
}
