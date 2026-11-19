# Mrs. Claus · Recetas navideñas

Integrantes: Hernández Miranda Adrián Jesús · Medina Morales Anthony · Mendoza Teniente Joshua · Rentería Patiño Félix Tadeo

Tablero del sprint: https://trello.com/b/Vm3ySzrE/spr1eq8c

## Sprint 1 · MVP 1 (17 al 21 de noviembre de 2026)

| Historia | Qué hace | Actividades |
|---|---|---|
| US1 | Escoger el tiempo de comida (desayuno, comida, cena o postre) y ver solo esas recetas | ACT-02 diseño · ACT-05 desarrollo · ACT-08 pruebas |
| US2 | Seleccionar una receta de la lista y ver su detalle | ACT-03 diseño · ACT-06 desarrollo · ACT-09 pruebas |
| US3 | Ver la receta en video o por escrito | ACT-04 diseño · ACT-07 desarrollo · ACT-10 pruebas |

ACT-01 (configuración del proyecto y catálogo de recetas) es la base de las tres historias.

## Estructura

```
index.html          Página del módulo
css/styles.css      Estilos
js/app.js           Lógica (una sección por historia)
data/recetas.json   Catálogo de recetas (ACT-01)
img/recetas/        Imágenes de las recetas
docs/evidencias/    Mockups y capturas de pruebas
```

### Formato de cada receta en `data/recetas.json`

```json
{
  "id": 1,
  "nombre": "Ponche navideño",
  "tiempo": "postre",
  "imagen": "img/recetas/ponche.jpg",
  "video": "https://www.youtube.com/embed/...",
  "pasos": ["Paso 1", "Paso 2"]
}
```

`tiempo` solo puede ser `desayuno`, `comida`, `cena` o `postre`. Si una receta no tiene video o pasos, el campo se deja vacío (`""` o `[]`) para probar los mensajes de "no disponible".

## Cómo trabajamos

1. Antes de empezar: `git pull`.
2. Cada actividad en su propia rama: `act-05-filtro-tiempo`, `act-06-listado-detalle`, etc.
3. Commits que digan la actividad: `ACT-05: filtro por tiempo de comida`.
4. Al terminar, abrir un Pull Request a `main`; otro integrante lo revisa antes de unirlo.
5. Pegar el enlace del commit o del Pull Request como evidencia en la tarjeta de Trello y pasarla a SQA.

## Ver la página

Abrir `index.html` con la extensión Live Server de VS Code (el catálogo se carga con `fetch`, así que no funciona abriendo el archivo con doble clic). Publicada en GitHub Pages: https://felixtrep06.github.io/mrs-claus-recetas-eq8c/
