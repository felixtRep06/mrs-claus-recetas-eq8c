// Mrs. Claus · Recetas navideñas
// Cada historia tiene su sección; el responsable de cada ACT trabaja solo en la suya.

const estado = {
  recetas: [],          // catálogo cargado de data/recetas.json
  tiempo: null,         // desayuno | comida | cena | postre
  recetaActual: null    // receta abierta en el detalle
};

async function cargarRecetas() {
  const resp = await fetch('data/recetas.json');
  estado.recetas = await resp.json();
}

// ---------- US1 · Seleccionar el tiempo de comida (ACT-05) ----------

// ---------- US2 · Listado y detalle de receta (ACT-06) ----------

// ---------- US3 · Ver la receta en video o por escrito (ACT-07) ----------

cargarRecetas();
