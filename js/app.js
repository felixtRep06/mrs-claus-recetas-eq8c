// Mrs. Claus · Recetas navideñas
// Cada historia tiene su sección; el responsable de cada ACT trabaja solo en la suya.

const estado = {
  recetas: [],          // catálogo cargado de data/recetas.json
  tiempo: null,         // tiempo elegido (aún sin confirmar): desayuno | comida | cena | postre
  tiempoConfirmado: null, // tiempo con el que se filtró el catálogo
  recetaActual: null    // receta abierta en el detalle
};

const NOMBRES_TIEMPO = {
  desayuno: 'Desayuno',
  comida: 'Comida',
  cena: 'Cena',
  postre: 'Postre'
};

async function cargarRecetas() {
  const resp = await fetch('data/recetas.json');
  estado.recetas = await resp.json();
}

function mostrarSeccion(id) {
  ['seleccion-tiempo', 'listado-recetas', 'detalle-receta', 'vista-receta'].forEach((s) => {
    document.getElementById(s).hidden = s !== id;
  });
}

// ---------- US1 · Seleccionar el tiempo de comida (ACT-7) ----------

const botonesTiempo = document.querySelectorAll('.opcion-tiempo');
const textoSeleccion = document.getElementById('tiempo-seleccionado');
const mensajeTiempo = document.getElementById('mensaje-tiempo');

// Criterio 2: al elegir una opción se resalta y se muestra cuál es.
function seleccionarTiempo(tiempo) {
  estado.tiempo = tiempo;
  botonesTiempo.forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.tiempo === tiempo));
  });
  textoSeleccion.textContent = tiempo
    ? `Seleccionaste: ${NOMBRES_TIEMPO[tiempo]}`
    : 'Aún no eliges un tiempo de comida.';
  mensajeTiempo.hidden = true;
}

// Criterios 4 y 5: solo las recetas del tiempo elegido.
function filtrarPorTiempo(tiempo) {
  return estado.recetas.filter((r) => r.tiempo === tiempo);
}

// Criterio 3: sin selección se muestra el mensaje y no se avanza.
function confirmarTiempo() {
  if (!estado.tiempo) {
    mensajeTiempo.hidden = false;
    return;
  }
  estado.tiempoConfirmado = estado.tiempo;
  mostrarListado(filtrarPorTiempo(estado.tiempoConfirmado));
}

// Criterio 7: cambiar la selección vuelve a las opciones sin filtrar.
function cambiarSeleccion() {
  estado.tiempoConfirmado = null;
  seleccionarTiempo(null);
  mostrarSeccion('seleccion-tiempo');
}

botonesTiempo.forEach((b) => b.addEventListener('click', () => seleccionarTiempo(b.dataset.tiempo)));
document.getElementById('btn-confirmar').addEventListener('click', confirmarTiempo);
document.getElementById('btn-cambiar').addEventListener('click', cambiarSeleccion);
document.getElementById('btn-cambiar-listado').addEventListener('click', cambiarSeleccion);

// ---------- US2 · Listado y detalle de receta (ACT-8) ----------
// Versión mínima del listado para probar el filtro de US1.
// ACT-8 la completa con las tarjetas de receta y el detalle.

function mostrarListado(recetas) {
  const nombre = NOMBRES_TIEMPO[estado.tiempoConfirmado];
  document.getElementById('titulo-listado').textContent = `Recetas de ${nombre.toLowerCase()}`;
  const lista = document.getElementById('lista-recetas');
  const vacio = document.getElementById('sin-recetas');
  lista.innerHTML = '';

  // Criterio 6 de US1: sin recetas para ese tiempo se avisa y se permite cambiar.
  if (recetas.length === 0) {
    vacio.textContent = `No hay recetas disponibles para ${nombre.toLowerCase()}. Elige otro tiempo de comida.`;
    vacio.hidden = false;
  } else {
    vacio.hidden = true;
    recetas.forEach((r) => {
      const li = document.createElement('li');
      li.className = 'tarjeta-receta';
      const img = document.createElement('img');
      img.src = r.imagen;
      img.alt = r.nombre;
      const titulo = document.createElement('span');
      titulo.textContent = r.nombre;
      li.append(img, titulo);
      lista.appendChild(li);
    });
  }
  mostrarSeccion('listado-recetas');
}

// ---------- US3 · Ver la receta en video o por escrito (ACT-9) ----------

cargarRecetas();
