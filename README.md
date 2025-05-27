# Movie Explorer App

## Mejoras

- Añadir tests e2e
- Implementar petición de siguiente página al llegar al límite de resultados
- Montar backend para poder tener limite de resultados en la llamada a la api
- Crear componentes para los estados de carga y error.
- Crear un hook para gestionar datos añadidos al local storage
- Añadir transiciones en la carga de nuevas películas.
- Mejorar vista de detalle
  - Extraer componente de tags de género.
  - Añadir botón de añadir a favoritos.
- Mejora de gestión de errores añadiendo botónes de reintento
- Mejora y testeo de accesibilidad.
- Añadir documentación relevante proyecto en el README.
- Añadir pre-commit hooks
- Añadir CI/CD para correr tests y linting en cada push.
- Planificar proyecto para partirlo en tareas pequeñas y añadir código progresivamente

## Objetivo

Construir una pequeña aplicación web en React que consuma una API y permita explorar una lista de películas. Queremos que trates este mini proyecto como si lo fueses a poner en producción.

## Requisitos

El único requisito es el siguiente: de usarse alguna librería para gestión de estado, cosa totalmente opcional, por favor usar `@preact/signals-react`

## Instrucciones

Listado de películas:

- Muestra el título, imagen y resumen de cada show.
- Paginación o scroll infinito (mínimo 20 elementos visibles).

Detalle:

- Al hacer clic en una película, muestra una vista de detalle con más información.

Favoritos:

- El usuario puede marcar películas como favoritas (almacenado en localStorage).

Usa esta API pública de ejemplo `GET https://api.tvmaze.com/shows`.

Incluye un README explicando brevemente qué harías diferente con más tiempo.

## Entrega

Sube tu código a un repo de GitHub. Si es privado trendrás que darnos acceso (usuarios ograu y lonamiaec de github)
