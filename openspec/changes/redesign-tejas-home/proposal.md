## Why

El sitio actual de Tejas Chocolate + Barbecue (tejaschocolate.com) corre sobre Wix con una plantilla genérica: fondo guinda plano, tipografía Avenir Heavy en todos los títulos, galerías Pro Gallery de Wix sin precios, una barra marquee de anuncios que pelea con el hero, y una página única de 8,241px que mezcla historia, menú completo, merch y contacto sin jerarquía. No comunica el posicionamiento real del negocio —chocolate bean-to-bar artesanal + barbacoa texana premiada— y se ve igual que cualquier otro restaurante hecho en Wix.

El cliente quiere el nivel de acabado de jfvegancafe.com: un sitio editorial, espacioso, con tipografía didone en minúsculas, fotografía a sangre, scroll suave y animaciones coreografiadas. Este cambio establece esa dirección visual sobre un stack propio antes de invertir en el resto del sitemap.

## What Changes

- **BREAKING**: se abandona Wix. El sitio pasa a un proyecto Astro propio con salida estática; el contenido deja de editarse en el editor de Wix.
- Se crea el proyecto desde cero: Astro + Tailwind CSS + GSAP/ScrollTrigger + Lenis + Swiper (el repo está vacío, sin commits).
- Se rediseña **únicamente la home**. El resto de las rutas (About, Menu completo, Order To-Go, Catering, Gift Cards, Shop, Contact) queda fuera de alcance en esta entrega; los enlaces del nav apuntan a los destinos externos/actuales hasta que se migren.
- Se define un sistema visual nuevo: serif didone en minúsculas para titulares, sans geométrica en versalitas con tracking amplio para navegación y microcopy, paleta de neutros cálidos con acento cacao/bronce, y una escala de espaciado amplia (secciones de 80–200px, secciones a altura de viewport).
- Se define un sistema de movimiento: cortina de entrada, revelado de titulares por palabra/línea, parallax de fotografía, contador de carrusel, botones circulares con texto rotatorio y scroll suave global — todo con respeto a `prefers-reduced-motion`.
- La home se reestructura en secciones: hero en video a pantalla completa, declaración de marca, historia bean-to-bar / barbacoa, carrusel de platillos destacados, franja de cita, merch, contacto y footer oscuro con teléfono y CTA de orden.
- El menú completo (≈40 platillos) **no** se vuelca en la home: se sustituye por un carrusel curado de destacados más un CTA hacia el menú.
- La barra marquee de anuncios de Wix se elimina; el aviso de breakfast tacos se reubica como un elemento discreto del hero o del footer.

## Capabilities

### New Capabilities
- `site/visual-system`: tokens de diseño del sitio — escala tipográfica, paleta, espaciado, radios, formas de botón y tratamiento de imagen. Es la fuente de verdad que consumen las demás capacidades.
- `site/motion-system`: comportamiento de animación — scroll suave, secuencia de entrada, revelados por scroll, parallax, interacciones de hover y el contrato de accesibilidad de movimiento reducido.
- `site/home-page`: composición, orden, contenido y comportamiento responsivo de cada sección de la home.
- `site/shell`: header/navegación persistente, menú móvil y footer, compartidos por cualquier ruta futura.

### Modified Capabilities

(Ninguna: no existen specs previas en `openspec/specs/`.)

## Impact

- **Repositorio**: pasa de vacío a un proyecto Astro completo (`src/`, `public/`, `astro.config.mjs`, `tailwind.config.*`, `package.json`).
- **Dependencias nuevas**: `astro`, `@astrojs/tailwind`, `tailwindcss`, `gsap` (ScrollTrigger + SplitText), `lenis`, `swiper`.
- **Assets**: se requiere fotografía y video en calidad editorial. Los assets actuales de Wix son de baja resolución y no sirven para hero a sangre — es la dependencia externa que puede bloquear la implementación.
- **Contenido**: copy nuevo para hero, declaración de marca y cita. El texto actual de Wix se reutiliza parcialmente en la sección de historia.
- **Fuera de alcance**: hosting/DNS, migración del shop de merch (hoy en Wix Stores), formularios transaccionales y SEO/redirects desde las URLs de Wix — se tratan en cambios posteriores.
- **Entregable previo a implementación**: un mockup HTML navegable publicado como Artifact para aprobar la dirección visual antes de escribir código de producción.
