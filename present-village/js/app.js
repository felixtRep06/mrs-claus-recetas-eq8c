// Present Village · lógica del módulo de donaciones (Sprint 2)
// Estado compartido por las tres historias de usuario.
const estado = {
  tipo: null,            // "dinero" | "objeto"  (US1 · ACT-7)
  anonima: null,         // true | false         (US2 · ACT-8)
  nombreDonante: "",     // solo si anonima = false
  datos: {}              // monto o descripción y cantidad (US3 · ACT-9)
};

function mostrarSeccion(id) {
  document.querySelectorAll("main > section").forEach((s) => {
    s.hidden = s.id !== id;
  });
}

// ---------- US1 · Seleccionar el tipo de donación (ACT-7) ----------

// ---------- US2 · Donación anónima o con nombre (ACT-8) ----------

// ---------- US3 · Captura de datos y registro (ACT-9) ----------
