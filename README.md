# react-tw-breakpoints

Hooks ligeros para breakpoints en React, con dos modos:

- Viewport: usa `matchMedia` y es global al `window`.
- Container (real): usa `ResizeObserver` para medir un elemento y devolver su breakpoint.

Incluye utilidades de condición (largerThan/lessThan/onlyAt) y es tree-shakeable.

## Instalación

```sh
npm install react-tw-breakpoints
```

Peer deps: React 18/19 (DOM). Opcionalmente Tailwind si lo usas para estilos.

## Breakpoints por defecto

Viewport y container comparten etiquetas, con sets distintos si lo deseas.

```ts
// src/const/breakpoints.ts
export const BreakpointEnum = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  _2xl: "1536px",
  _3xl: "1792px",
  _4xl: "2048px",
  _5xl: "2304px",
} as const;
export const BreakpointValue = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  _2xl: 1536,
  _3xl: 1792,
  _4xl: 2048,
  _5xl: 2304,
} as const;

export const BreakpointContainerEnum = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  _2xl: "1536px",
  _3xl: "1792px",
  _4xl: "2048px",
  _5xl: "2304px",
  _6xl: "2560px",
  _7xl: "2816px",
} as const;
export const BreakpointContainerValue = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  _2xl: 1536,
  _3xl: 1792,
  _4xl: 2048,
  _5xl: 2304,
  _6xl: 2560,
  _7xl: 2816,
} as const;
```

## Uso rápido

### 1) Viewport

```tsx
import { useBreakpoint, useBreakpointCondition } from "react-tw-breakpoints";

function Example() {
  const bp = useBreakpoint(); // 'xs' | 'sm' | ...
  const isLgUp = useBreakpointCondition({ largerThan: "lg" });
  const onlyMd = useBreakpointCondition({ onlyAt: "md" });
  return (
    <div>
      <p>Viewport BP: {bp}</p>
      {isLgUp && <span>≥ lg</span>}
      {onlyMd && <span>md only</span>}
    </div>
  );
}
```

### 2) Container (real por elemento)

```tsx
import { useRef } from "react";
import { useContainerBreakpoint } from "react-tw-breakpoints";

function Card() {
  const ref = useRef<HTMLDivElement>(null);
  const bp = useContainerBreakpoint(ref); // basado en el ancho del div
  return (
    <div ref={ref} style={{ width: "100%" }}>
      {bp === "xs" && <OneCol />}
      {bp === "md" && <TwoCols />}
      {bp === "lg" && <ThreeCols />}
    </div>
  );
}
```

## API

### useBreakpoint(): StaticBreakpoint

- Devuelve el label activo del viewport.
- Internamente usa un store con `matchMedia` deduplicado y `useSyncExternalStore`.

### useBreakpointCondition(opts): boolean

- `opts`: `{ largerThan?: BP; lessThan?: BP; onlyAt?: BP }` (mutuamente combinables, `onlyAt` tiene prioridad)
- Evalúa el viewport actual sin listeners duplicados.

### useBreakpointContainer(): StaticBreakpointContainer

- Igual a `useBreakpoint` pero con el set de “container breakpoints”, también basado en viewport.
- Útil si quieres dos sistemas de BP basados en `window`.

### useContainerBreakpoint(ref): StaticBreakpointContainer

- “Container query” real por elemento.
- Mide el ancho del elemento referenciado con `ResizeObserver` y lo mapea al label.
- Recomendado para lógica de React dependiente del espacio real del componente.

## Tailwind y CSS @container (estilos sin JS)

Para estilos responsive por contenedor, usa la característica nativa de CSS: `@container`.

1. Marca el contenedor:

```css
.card {
  container-type: inline-size; /* opcional: container-name: card; */
}
```

Con Tailwind v4 (propiedades arbitrarias):

```html
<div class="[container-type:inline-size] card">
  <div class="content">...</div>
  <!-- ahora puedes usar reglas @container en tu CSS -->
  <!-- o utilities con @layer y @apply -->
</div>
```

2. Reglas por ancho del contenedor:

```css
.card .content {
  display: block;
}

@container (width >= 640px) {
  .card .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@container (width >= 1024px) {
  .card .content {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

3. Unidades de contenedor útiles (sin breakpoints):

```css
.hero {
  padding-inline: 6cqw;
}
```

Combina: usa `@container` para estilos y `useContainerBreakpoint` solo si necesitas lógica de render.

## SSR y StrictMode

- Los hooks usan `useSyncExternalStore` para suscripciones seguras.
- En SSR devuelven valores base (`xs` o `false`) y se hidratan en el cliente.
- No hay listeners duplicados en StrictMode.

## Compatibilidad

- `matchMedia`: todos los navegadores modernos.
- `ResizeObserver`: Chrome/Edge 64+, Safari 13.4+, Firefox 69+.
- `@container` CSS: Chrome/Edge 105+, Safari 16+, Firefox 110+.

## Preguntas frecuentes

- ¿Por qué dos tipos de “container breakpoints”?

  - `useBreakpointContainer` usa viewport con otro set de etiquetas (útil si quieres 2 rejillas globales).
  - `useContainerBreakpoint` es real por elemento.

- ¿Puedo cambiar los breakpoints?

  - Sí, edita `src/const/breakpoints.ts` y recompila el paquete.

- ¿Tree-shaking?
  - Sí. `package.json` exporta ESM y `sideEffects: false`. Importa solo lo que uses.

## Desarrollo y publicación

Este paquete utiliza un workflow automático de GitHub Actions para publicar a NPM.

### Para maintainers

1. **Publicación automática**: El paquete se publica automáticamente a NPM cuando se crea un release en GitHub.

2. **Requisitos**:
   - La versión en `package.json` debe coincidir con el tag del release (ej: si el tag es `v1.2.3`, `package.json` debe tener `"version": "1.2.3"`).
   - Se requiere configurar el secret `NPM_TOKEN` en el repositorio con un token válido de NPM.

3. **Proceso**:
   ```bash
   # 1. Actualizar versión
   npm version patch|minor|major
   
   # 2. Hacer push del tag
   git push origin --tags
   
   # 3. Crear release en GitHub usando el tag
   # 4. El workflow se ejecutará automáticamente
   ```

4. **Publicación manual**: También se puede ejecutar manualmente desde la pestaña "Actions" en GitHub.

## Licencia

MIT
