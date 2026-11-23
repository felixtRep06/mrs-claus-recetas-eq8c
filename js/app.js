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

const ETIQUETA_TIEMPO = (t) => (NOMBRES_TIEMPO[t] || '').toLowerCase();

// Criterio 1: el listado muestra cada receta con su nombre y una imagen.
function mostrarListado(recetas) {
  const nombre = ETIQUETA_TIEMPO(estado.tiempoConfirmado);
  document.getElementById('titulo-listado').textContent = `Recetas de ${nombre}`;
  const lista = document.getElementById('lista-recetas');
  const vacio = document.getElementById('sin-recetas');
  lista.innerHTML = '';

  // Criterio 6 de US1: sin recetas para ese tiempo se avisa y se permite cambiar.
  if (recetas.length === 0) {
    vacio.textContent = `No hay recetas disponibles para ${nombre}. Elige otro tiempo de comida.`;
    vacio.hidden = false;
  } else {
    vacio.hidden = true;
    recetas.forEach((r) => {
      const li = document.createElement('li');
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'tarjeta-receta';
      boton.dataset.id = r.id;
      const img = document.createElement('img');
      img.src = r.imagen;
      img.alt = r.nombre;
      const titulo = document.createElement('span');
      titulo.className = 'tarjeta-nombre';
      titulo.textContent = r.nombre;
      const accion = document.createElement('span');
      accion.className = 'tarjeta-accion';
      accion.textContent = 'Ver receta →';
      boton.append(img, titulo, accion);
      // Criterio 2: al seleccionar una receta se abre su detalle.
      boton.addEventListener('click', () => abrirDetalle(r.id));
      li.appendChild(boton);
      lista.appendChild(li);
    });
  }
  mostrarSeccion('listado-recetas');
}

// Una receta se puede mostrar si existe y tiene nombre e imagen.
function recetaValida(r) {
  return Boolean(r && r.nombre && r.imagen && NOMBRES_TIEMPO[r.tiempo]);
}

// Criterios 3 y 4: el detalle muestra nombre e imagen, solo de la receta elegida.
// Criterio 5: si el detalle no puede cargarse se muestra un error con opción de volver.
function abrirDetalle(id) {
  const receta = estado.recetas.find((r) => r.id === id);
  const contenido = document.getElementById('contenido-detalle');
  const error = document.getElementById('error-detalle');
  const regresar = document.getElementById('btn-regresar-listado');

  if (!recetaValida(receta)) {
    estado.recetaActual = null;
    contenido.hidden = true;
    regresar.hidden = true;
    error.hidden = false;
    mostrarSeccion('detalle-receta');
    return;
  }

  estado.recetaActual = receta;
  error.hidden = true;
  contenido.hidden = false;
  regresar.hidden = false;
  regresar.textContent = `← Regresar a recetas de ${ETIQUETA_TIEMPO(estado.tiempoConfirmado)}`;

  const img = document.getElementById('detalle-imagen');
  img.src = receta.imagen;
  img.alt = receta.nombre;
  document.getElementById('detalle-nombre').textContent = receta.nombre;
  document.getElementById('detalle-tiempo').textContent = NOMBRES_TIEMPO[receta.tiempo];
  const pasos = Array.isArray(receta.pasos) ? receta.pasos.length : 0;
  document.getElementById('detalle-pasos').textContent =
    pasos > 0 ? `${pasos} pasos` : 'Sin instrucciones escritas';
  document.getElementById('detalle-video').textContent =
    receta.video ? 'Video disponible' : 'Sin video';
  mostrarSeccion('detalle-receta');
}

// Criterio 6: «Regresar» vuelve al listado y conserva el tiempo de comida.
function regresarAlListado() {
  estado.recetaActual = null;
  mostrarListado(filtrarPorTiempo(estado.tiempoConfirmado));
}

document.getElementById('btn-regresar-listado').addEventListener('click', regresarAlListado);
document.getElementById('btn-volver-error').addEventListener('click', regresarAlListado);

// ---------- US3 · Ver la receta en video o por escrito (ACT-9) ----------

const panelVideo = document.getElementById('panel-video');
const panelTexto = document.getElementById('panel-texto');
const avisoModo = document.getElementById('aviso-modo');
const iframeVideo = document.getElementById('video-receta');

function tieneVideo(r) { return Boolean(r && r.video); }
function tienePasos(r) { return Boolean(r && Array.isArray(r.pasos) && r.pasos.length > 0); }

function mostrarAviso(titulo, texto, textoBoton, modoDestino) {
  document.getElementById('aviso-titulo').textContent = titulo;
  document.getElementById('aviso-texto').textContent = texto;
  const boton = document.getElementById('aviso-boton');
  boton.textContent = textoBoton;
  boton.onclick = () => abrirModo(modoDestino);
  avisoModo.hidden = false;
}

// Criterios 2 a 6: muestra la receta actual en la modalidad elegida.
function abrirModo(modo) {
  const receta = estado.recetaActual;
  if (!receta) return;

  document.getElementById('vista-nombre').textContent = receta.nombre;
  document.getElementById('vista-tiempo').textContent = NOMBRES_TIEMPO[receta.tiempo];
  const img = document.getElementById('vista-imagen');
  img.src = receta.imagen;
  img.alt = receta.nombre;
  document.getElementById('modo-video').setAttribute('aria-pressed', String(modo === 'video'));
  document.getElementById('modo-texto').setAttribute('aria-pressed', String(modo === 'texto'));

  panelVideo.hidden = true;
  panelTexto.hidden = true;
  avisoModo.hidden = true;
  iframeVideo.src = '';

  if (modo === 'video') {
    if (tieneVideo(receta)) {
      // Criterio 2: reproductor con el video de esa receta.
      iframeVideo.src = receta.video;
      iframeVideo.title = `Video de la receta: ${receta.nombre}`;
      panelVideo.hidden = false;
    } else {
      // Criterio 5: sin video se avisa y se ofrece la versión escrita.
      mostrarAviso('Esta receta no tiene video disponible',
        'Puedes seguir la preparación con las instrucciones escritas.',
        'Leer la receta por escrito', 'texto');
    }
  } else if (tienePasos(receta)) {
    // Criterio 3: instrucciones escritas en orden de preparación.
    const lista = document.getElementById('pasos-receta');
    lista.innerHTML = '';
    receta.pasos.forEach((paso) => {
      const li = document.createElement('li');
      li.textContent = paso;
      lista.appendChild(li);
    });
    panelTexto.hidden = false;
  } else {
    // Criterio 6: sin instrucciones escritas se informa que no están disponibles.
    mostrarAviso('Las instrucciones escritas no están disponibles',
      'Esta receta todavía no tiene sus pasos por escrito. Puedes consultarla en video.',
      'Ver el video', 'video');
  }
  mostrarSeccion('vista-receta');
}

// Criterio 7: «Regresar» vuelve al detalle de la receta.
function regresarAlDetalle() {
  iframeVideo.src = '';
  abrirDetalle(estado.recetaActual.id);
}

// Criterio 1: el detalle ofrece «Ver video» y «Leer receta».
document.getElementById('btn-detalle-video').addEventListener('click', () => abrirModo('video'));
document.getElementById('btn-detalle-texto').addEventListener('click', () => abrirModo('texto'));
// Criterio 4: cambiar de modalidad conserva la receta que se consulta.
document.getElementById('modo-video').addEventListener('click', () => abrirModo('video'));
document.getElementById('modo-texto').addEventListener('click', () => abrirModo('texto'));
document.getElementById('btn-regresar-detalle').addEventListener('click', regresarAlDetalle);

cargarRecetas();
