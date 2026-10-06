## Context

Ver `proposal.md` — Why para la motivación. Lo que sigue es la auditoría técnica de ambos sitios, hecha con inspección en navegador (DOM, estilos computados y captura por scroll) el 2026-09-28, y las decisiones que se derivan de ella.

### Auditoría del sitio actual — tejaschocolate.com

Plataforma: **Wix** (`meta[name=generator] = Wix.com Website Builder`). Una sola página de **8,241px** de alto, 48 imágenes, widget de chat de Wix.

| Aspecto | Estado actual |
|---|---|
| Tipografía | Una sola familia para todo: `avenir-lt-w01_85-heavy` (Avenir LT 85 Heavy). Títulos a 25 / 30 / 40 / 56px. Sin escala coherente: el H2 de "Get Your Tejas Merch" (56px) pesa más que el H2 de "Our Story" (40px) sin razón jerárquica. |
| Interlineado | 1.2 en títulos (48px sobre 40px). Apretado, típico de plantilla. |
| Color | Fondo dominante `rgb(50,50,50)` con planchas guinda, acento rojo `rgb(177,26,10)`, texto blanco. Sin sistema de tokens. |
| Ancho de contenido | 1,333px máximo, sin respiración lateral definida. |
| Header | Nav sticky en versalitas, 8 destinos (HOME, ABOUT US, MENU, ORDER TO-GO, CATERING, GIFT CARDS, SHOP, CONTACT) más "Log In". Demasiados destinos compitiendo. |
| Barra de anuncios | Marquee horizontal infinito ("Breakfast Tacos 8AM - 11AM Thursday - Sunday") pegado bajo el nav. Se mueve durante toda la sesión y compite con el hero. |
| Hero | Foto del ahumador a sangre, logotipo centrado, titular de dos líneas. **Sin CTA dentro del hero** — los tres botones (SEE MENU / ORDER TO-GO / CATERING) viven en una banda gris debajo, desconectados de la imagen. |
| Menú | Wix Pro Gallery: ~40 platillos en retícula de fotos cuadradas con el nombre debajo, sin precios ni descripciones. Ocupa más de la mitad del scroll de la home. |
| Franja de cita | "Barbecue Perfection Takes Time" en rojo sobre ilustración lineal de vaca. Es el único momento con carácter propio del sitio. |
| Contacto | Panel dividido: izquierda oscura con dirección y dos íconos sociales; derecha con formulario de 4 campos. |
| Animación | Ninguna, salvo el marquee. Sin revelados por scroll, sin parallax, sin scroll suave. |

Diagnóstico: el problema no es el contenido, es que **todo tiene el mismo peso**. El menú completo aplasta la historia de marca, no hay ritmo vertical, y la única familia tipográfica en peso Heavy deja al sitio sin voz.

### Auditoría de la referencia — jfvegancafe.com

Plataforma: **WordPress 7.1.2 + Elementor + tema custom + Tailwind**. 9,043px de alto, 49 imágenes.

Librerías detectadas en runtime: **GSAP 3.12.5**, **ScrollTrigger (30 instancias activas)**, **Lenis** (scroll suave), **SplitType** (partición de texto), **Swiper**, **AOS**, jQuery.

| Aspecto | Cómo lo resuelve |
|---|---|
| Tipografía | Dos familias. **Bodoni Moda** (didone de alto contraste) en 64px / peso 400 / interlineado 97.6px (**1.525**) / `text-transform: lowercase`, centrado, para todos los titulares. **Montserrat** 14px / peso 500 / `letter-spacing: 2px` / mayúsculas para nav, botones y microcopy. |
| Color | `#000000` tinta, `#FEFEFE` blanco cálido, acento bronce `rgb(183,140,87)` = `#B78C57`, fondos de mármol y pinstripe fotográficos. Casi todo el color viene de la fotografía, no de planchas. |
| Espaciado | Padding de sección `py-[50px]` a `py-[80px]`, aperturas a `pt-[200px]` y `pt-[170px]`, `mb-[100px]` entre bloques. Varias secciones a `h-screen`. |
| Hero | `<video>` a sangre a pantalla completa, logotipo, titular "be kind to every kind." y CTA circular, todo centrado y superpuesto. Cortina de entrada (`animation-loading` en `<body>`, clase `bottomtop active` en el hero). |
| Declaración de marca | Un solo titular de tres líneas sobre mármol, sin nada más. 200px de padding superior. |
| Secciones de oficio | Palabras sueltas gigantes — "eat", "sip", "falafels" — como títulos de sección. Máxima economía, máximo impacto. |
| Carrusel | Swiper con contador `02 / 05`, regla de progreso fina y flechas de 1px. Sin autoplay. |
| Botones | `.roundborder`: círculo de **120×120px**, radio 65px, borde de 1px, sin relleno. La etiqueta está **duplicada en el DOM** ("SEE MENU SEE MENU") → intercambio vertical en hover. |
| Máscaras de imagen | Círculo, cápsula vertical (superelipse) y rectángulo de esquinas muy suaves. Nunca una foto cuadrada a hueso. |
| Decoración | Trazos de 1px en bronce: cápsulas, arcos, diamantes pequeños, que se dibujan conforme entra la sección. |
| Franja de orden | Banda de mármol oscuro con el teléfono `713.505.1044` a la izquierda y "order now" subrayado a la derecha, ambos en Bodoni ~30px. |
| Footer | Blanco, logotipo + nav inline, luego columnas "just falafel" / "business hours" en Bodoni pequeña con datos en Montserrat. |

Lo que hace que funcione: **una sola idea por pantalla**, tipografía de exhibición en minúsculas, fotografía haciendo todo el trabajo de color, y movimiento que acompaña el scroll en lugar de decorarlo.

## Goals / Non-Goals

**Goals:**

- Trasladar el *sistema* de la referencia —dos familias, minúsculas, aire, movimiento coreografiado— sin copiar su marca. Tejas es fuego, post oak y rojo; JF es mármol y cítrico. La estructura se toma prestada, la paleta y el tono no.
- Dejar los tokens de diseño en un solo lugar (config de Tailwind) para que el mockup aprobado y el sitio de producción compartan valores exactos.
- Que el sitio funcione y se lea completo con JavaScript deshabilitado o con movimiento reducido.
- Que la home cargue con LCP < 2.5s pese al video del hero.

**Non-Goals:**

- No se construye un CMS ni panel de edición. El contenido vive en archivos de contenido del repo en esta entrega.
- No se replica el preloader con porcentaje ni el cursor custom de la referencia: suman peso y no aportan a un restaurante.
- No se migra el shop de merch; la sección enlaza a la tienda existente.
- No se construyen las demás rutas del sitemap.
- No se replican los trazos decorativos de la referencia (arcos, diamantes, cápsulas de 1px) ni se añaden gráficos generados de ningún tipo. La atmósfera la pone la fotografía. Ver D10.

## Decisions

### D1 — Astro sobre Next.js o WordPress

**Elegido:** Astro + `@astrojs/tailwind`, salida estática.

La home es contenido esencialmente estático con animación pesada. Astro entrega HTML con cero JavaScript por defecto y permite cargar GSAP/Lenis únicamente en las islas que los necesitan (`client:visible`), que es justo lo que el presupuesto de LCP exige.

*Alternativas:* **Next.js** — el App Router y el runtime de React cuestan ~90KB de JS para una página sin estado de aplicación; se justificaría solo si el shop se trae al proyecto. **WordPress + Elementor** (lo que usa la referencia) — daría edición al cliente, pero el trabajo real está en el tema custom y arrastra hosting PHP, plugins y el propio peso de Elementor; la referencia carga jQuery, AOS *y* GSAP porque Elementor lo impone. **HTML plano + Vite** — viable, pero componentizar las 8 secciones y las variantes de tarjeta a mano se paga en la primera iteración de contenido.

### D2 — Tokens de diseño en `tailwind.config`, no en CSS suelto

La escala tipográfica, la paleta y el ritmo de espaciado se declaran como extensión del tema de Tailwind y se consumen como clases. Un solo archivo es la fuente de verdad que el spec `site/visual-system` describe en términos de comportamiento.

Tokens (revisados tras la revisión de mockup v1 — ver D10):

```
colors:
  paper    #FAF8F5   fondo principal (casi blanco, L 97%) — ver D12
  paper-2  #F1ECE5   fondo alterno (contacto)
  ink      #151110   texto — 17.7:1 sobre paper
  warm     #FBF7F2   texto sobre oscuro
  red      #B11A0A   ACENTO — rojo Tejas, 6.56:1 sobre paper (AA)
  red-d    #8E1409   rojo profundo
  red-l    #D9583C   rojo sobre oscuro, 4.73:1 sobre char
  oxblood  #3A0D08   guinda profundo — franjas oscuras
  char     #171110   negro cálido — hero
  smoke    #6E6157   microcopy, 5.64:1 sobre paper (AA)

fontFamily:
  display: 'Bodoni Moda', serif      // titulares, minúsculas
  body:    'Montserrat', sans-serif  // nav, botones, párrafos

fontWeight:
  display  600 normal, 700 en palabras de oficio (>96px)
  display  font-variation-settings: 'opsz' 18  (26 en las palabras gigantes)
  body     600 en etiquetas/nav/botones, 500 en texto corrido

fontSize (display):
  clamp(2rem, 1.02rem + 4.18vw, 5rem)   // 32px → 80px
  lineHeight 1.5 en display, 1.85 en body
  letterSpacing 0.24em en nav/botones

borderRadius (máscaras):
  circle  50%
  arch    50% 50% 8px 8px / 38% 38% 8px 8px
  leaf    8px 58% 8px 8px / 8px 62% 8px 8px
  petal   58% 8px 8px 8px / 62% 8px 8px 8px
  dome    50% 8px 8px 50% / 50% 8px 8px 50%
  soft    18px   (solo piezas secundarias)

spacing (secciones):
  section-sm  5rem  (80px)   móvil
  section     7.5rem (120px) desktop
  section-lg  12.5rem (200px) aperturas
```

*Alternativa considerada:* CSS custom properties puras. Se descartó porque perderíamos las variantes responsivas de Tailwind, que es donde vive la mitad del trabajo de spacing.

### D3 — GSAP + ScrollTrigger + Lenis, sin AOS

**Elegido:** GSAP 3.12 con ScrollTrigger y SplitText, más Lenis para scroll suave. Swiper solo para el carrusel.

Es exactamente el motor de la referencia menos el ruido. La referencia carga AOS *además* de GSAP porque Elementor lo trae; nosotros no tenemos esa restricción y AOS no aporta nada que ScrollTrigger no haga mejor.

**SplitText vs SplitType:** la referencia usa SplitType (gratuito). Si la licencia de GSAP Club está disponible se usa SplitText, que maneja mejor los saltos de línea al redimensionar; si no, SplitType es el sustituto directo sin cambio de arquitectura.

*Alternativas:* **CSS scroll-driven animations** (`animation-timeline: view()`) — nativo y sin librería, pero el soporte en Safari sigue siendo el que es, y el revelado escalonado por palabra con partición de texto no tiene equivalente declarativo. **Motion One / Framer Motion** — más ligeros, pero ScrollTrigger sigue sin rival para pinning y scrub, y la referencia ya demuestra que 30 triggers se sostienen.

### D4 — El movimiento se apaga, no se degrada

`gsap.matchMedia()` con `prefers-reduced-motion: reduce` es la única puerta de entrada a cualquier animación. Fuera de ella, los elementos no llevan estado inicial oculto: se escriben visibles en el HTML y GSAP los toma desde ahí (`gsap.from`, no `gsap.to` desde `opacity: 0` en CSS).

Esto satisface el escenario "animación interrumpida" del spec de motion: si el script falla, el contenido ya está visible. Es el error más común al copiar este tipo de sitio — la referencia lo tiene: su `<body>` se quedó en `animation-loading` durante la inspección y el hero no llegó a revelarse.

Lenis se inicializa solo cuando el movimiento reducido está desactivado; en el otro caso el scroll es el nativo.

### D5 — El menú no vive en la home

La home actual dedica ~4,000px al catálogo completo sin precios. Se sustituye por un carrusel de 4–6 platillos con foto, nombre y descripción breve, más un CTA al menú. El catálogo completo se trata como ruta aparte en un cambio posterior.

*Alternativa:* acordeón de categorías en la home. Se descartó: esconde el contenido tras un clic y no resuelve que el menú no es la razón por la que alguien llega a la home.

### D6 — Video del hero con presupuesto estricto

El `<video>` se sirve en H.264 y WebM, sin audio, `muted playsinline loop`, con `poster` obligatorio, `preload="none"` y montaje condicionado a `min-width: 768px` vía `matchMedia` en JS. Por debajo de 768px solo se sirve el póster.

El póster es el LCP real en móvil, así que va en AVIF/WebP con `fetchpriority="high"` y sin lazy loading. Objetivo: video ≤ 3MB, póster ≤ 120KB.

### D7 — Botón circular con etiqueta duplicada

Se replica la técnica de la referencia (`.roundborder`): círculo de 120px, borde 1px, la etiqueta escrita dos veces dentro de un contenedor con `overflow: hidden`, y en hover un `translateY(-100%)` de 300ms sobre el par. La copia duplicada se marca `aria-hidden="true"` para que los lectores de pantalla no anuncien "SEE MENU SEE MENU".

### D8 — Formulario de contacto sin backend propio

Se usa un endpoint de terceros (Formspree o Web3Forms) con envío `fetch` y manejo de estado en el cliente. La salida sigue siendo estática y no hay que operar un servidor por tres campos. La validación de formato de correo y mensaje no vacío se hace en el cliente antes del envío, como pide el spec.

### D10 — Correcciones de la revisión del mockup v1

El mockup v1 se revisó el 2026-09-28 y produjo cinco correcciones que cambian los specs, no solo el mockup:

**Rojo, no cacao.** La paleta v1 usaba un acento cacao/bronce y leía como café oscuro. El rojo es identidad heredada del sitio actual (`#B11A0A`) y se conserva. Se validó con cálculo de contraste antes de fijarlo: 5.92:1 sobre hueso, AA para texto normal. Las franjas oscuras pasan de carbón neutro a guinda profundo `#3A0D08`, que es rojo llevado a su extremo oscuro en vez de un negro sin relación con la marca.

**Bodoni a 600, no a 400.** A tamaño de exhibición los trazos finos de una didone se adelgazan hasta perder legibilidad; a 400 el titular se deshilacha. Se sube a 600 (700 en las palabras de oficio, que llegan a 176px) y se fija `font-optical-sizing: none` con `'opsz' 18`. El tamaño óptico bajo está diseñado para texto pequeño: engrosa la asta fina y baja el contraste thick/thin. Es la palanca correcta — subir solo el peso engorda también la asta gruesa y vuelve el titular pesado.

**Máscaras de arco, no rectángulos redondeados.** v1 usaba `border-radius: 24px` en la mayoría de las fotos, que es exactamente el default genérico. Se sustituye por un set de seis formas derivadas del arco (círculo, arco, hoja, pétalo, domo, suave), con el rectángulo suave degradado a piezas secundarias. La forma es parte de la identidad, no un detalle de estilo.

**Autoplay sí.** v1 especificaba carrusel sin autoplay. El cliente lo quiere y tiene razón: el movimiento sostenido es parte de lo que hace que el sitio se sienta vivo. Se añade avance cada 5s con bucle. Como supera los 5 segundos, WCAG 2.2.2 obliga a un control de pausa explícito, más pausa en hover y en foco — no es opcional y no se negocia.

**Galería masonry.** Sección nueva entre el carrusel y la franja de cita: 8–12 piezas de altura desigual en 2/3/4 columnas, con fotografía y video en bucle corto. Se implementa con CSS `columns` + `break-inside: avoid`, no con una librería de masonry: el orden de lectura vertical por columna es aceptable para una galería y ahorra una dependencia y un recálculo en cada resize.

**Parallax en tres planos, siempre sobre fotografía.** v1 lo tenía solo en fondos y fotos. Se extiende al medio del hero y a las piezas de la galería, cada una a su propia velocidad. Regla de implementación: cuando una pieza tiene entrada y parallax a la vez, cada animación controla propiedades distintas — el scrub se queda con `y`, la entrada solo con la opacidad. Dos tweens sobre la misma propiedad se pisan.

**Nada de gráficos decorativos.** Una segunda revisión retiró el campo de brasas en canvas del hero y todos los arcos concéntricos y elementos flotantes en SVG. El veredicto del cliente fue que rompen el estilo, y tiene razón por una razón estructural: el sitio de referencia consigue su atmósfera con fotografía a sangre y aire, no con adornos vectoriales. Un gráfico generado en el hero además compite con la foto en vez de sustituirla, y presentar uno como provisional invita a que se quede.

La regla que queda en el spec: **el fondo del hero es un elemento de video o imagen, nunca un canvas, un SVG ni un patrón generado**, y el parallax se aplica sobre fotografía y video, nunca sobre gráficos decorativos. En el mockup el hero es un slot con la especificación del asset escrita encima, que es lo honesto mientras no exista el material.

### D11 — El gate de movimiento es un booleano, no un par de media queries

El mockup v1 falló en producción de la peor forma posible: la cortina de entrada se quedó cubriendo la página. La causa fue gatear todas las animaciones con `gsap.matchMedia()` sobre dos consultas complementarias (`reduce` y `no-preference`); en el sandbox del artifact no matcheó ninguna, ningún callback corrió, y la cortina —que dependía de la animación para retirarse— se quedó encima.

Dos reglas que salen de ahí y que aplican al código de producción:

1. La preferencia se evalúa con **una** consulta: `matchMedia('(prefers-reduced-motion: reduce)').matches`. Nunca un par complementario.
2. Todo elemento que tape contenido nace oculto por CSS y solo se muestra cuando ya se va a retirar, además de un `setTimeout` de piso duro que lo retira pase lo que pase. Es la contraparte de D4: D4 asegura que el contenido sea visible si el script falla; esto asegura que nada lo tape si el script se detiene a medias.

### D12 — La estructura es el diseño, no la tipografía

La revisión de v3 fue "no da el mismo feeling que el original", y la causa no estaba en la paleta ni en la tipografía —esas ya eran correctas— sino en la **densidad**. v1 a v3 empaquetaban historia dual en dos columnas, carrusel contenido en la retícula con caption bajo cada tarjeta, merch y contacto en secciones normales. Todo correcto y todo apretado.

Lo que hace a la referencia lo que es:

1. **Fondo casi blanco.** El hueso beige de v1–v3 (`#F2ECE3`) pesa y cancela el aire. El fondo sube a `#FAF8F5`, luminosidad 97%. El color lo pone la fotografía, no el papel. Queda como requisito medible en el spec: luminosidad HSL ≥ 96%.
2. **Una idea por pantalla.** Seis secciones a `100svh` con un solo titular, o una foto con una palabra, o una foto con un botón. La referencia dedica una pantalla entera a tres líneas de texto — ese gasto de espacio *es* el lujo.
3. **Carrusel a sangre.** Las diapositivas se cortan por ambos bordes del viewport; el nombre del platillo va debajo, centrado, en Bodoni grande, y cambia con transición de opacidad. Un carrusel de tarjetas con caption debajo de cada una es una retícula de producto, no una pieza editorial.
4. **Fotos grandes.** 46–58vw, centradas, sin texto al lado.
5. **La página mide el doble** para el mismo contenido.

Estas cinco reglas quedan en los specs (`site/home-page` → "Una idea por pantalla" y el carrusel a sangre; `site/visual-system` → luminosidad del fondo), no solo en el mockup, porque son justamente las que un desarrollador comprime sin darse cuenta al implementar.

**Sobre replicar la referencia:** se toman estructura, composición, ritmo vertical y comportamiento de movimiento. No se toman sus fotografías, su copy, su logotipo ni su marca. El contenido es de Tejas y la paleta es de Tejas; lo que se hereda es el sistema de composición, que es exactamente lo que el cliente pidió desde el encargo inicial.

### D13 — Las pantallas completas se presupuestan en altura

Una sección de `100dvh` solo funciona si su contenido cabe; si no, el "una idea por pantalla" se convierte en media idea por pantalla y el usuario hace scroll a mitad de una composición. v4 dimensionaba fotos y titulares únicamente en `vw` y `px`, así que en cualquier viewport bajo el contenido rebasaba la altura.

La regla es que **cada elemento de una pantalla completa lleva un tope de ancho y un tope de altura**: `width: min(46vw, 340px, 27dvh)` en las fotos, `clamp(3rem, min(0.4rem + 15.3vw, 16dvh), 13rem)` en las palabras de exhibición, `min(124px, 15dvh)` en el botón circular, y padding y gaps en `dvh`. Con máscaras de proporción conocida el tope en `dvh` sobre el ancho fija también la altura: un arco 3:4 limitado a 27dvh de ancho mide 36dvh de alto.

Presupuesto verificado para la pantalla más cargada (etiqueta + palabra + foto + párrafo): 798px de 900 a 1440×900, 651 de 700, 614 de 640 y 628 de 844 en móvil.

Dos decisiones que acompañan:

- **`min-height`, nunca `height` con `overflow: hidden`.** Recortar no es mostrar. Si un caso extremo excede el presupuesto, la sección crece y se ve fea; con `overflow: hidden` desaparecería contenido sin avisar, que es peor.
- **Por debajo de 560px de alto se levanta la restricción.** En esa altura, forzar foto, palabra y texto los reduce a tamaños ilegibles. La sección fluye. Legible gana sobre exactamente una pantalla.

### D9 — El mockup es un Artifact, no código del proyecto

La dirección visual se aprueba sobre una página HTML autocontenida publicada como Artifact: tipografía, paleta, spacing y animaciones reales al hacer scroll. No entra al repo. Una vez aprobada, sus valores se transcriben a `tailwind.config` y de ahí en adelante esa config es la fuente de verdad.

## Risks / Trade-offs

- **Los assets actuales de Wix no dan la talla.** Las fotos del sitio son de baja resolución y no hay video del ahumador. Un hero a sangre con material pobre se ve peor que el sitio actual → **Mitigación:** el mockup se construye con placeholders declarados como tales; la sesión de foto/video se levanta como dependencia bloqueante antes de implementar, y se define un fallback de póster estático si el video no llega.
- **La estética didone en minúsculas es una apuesta de marca.** A Tejas —barbacoa texana, ilustración de vaca, acento rojo— puede quedarle distante o "de café" si se traslada la referencia literalmente → **Mitigación:** la paleta cambia a hueso/cacao/ahumado y la fotografía manda; el mockup existe precisamente para validar esto antes de escribir código de producción.
- **Bodoni Moda tiene trazos muy finos.** A tamaños pequeños o sobre fotografía pierde legibilidad → **Mitigación:** se restringe a ≥ 24px y siempre sobre fondo con capa de oscurecimiento; nunca para texto corrido.
- **Los ScrollTriggers cuestan.** El sitio de referencia tiene un scroll pesado en equipos modestos → **Mitigación:** el presupuesto inicial de 12–15 resultó inventado: la home tiene 12 secciones, 23 fotografías y 10 titulares, y un revelado por titular más un parallax por pieza ya suman más que eso. La implementación arrancó en ~58 y bajó a **34** quitando lo que no se aprecia — el escalado 1→1.12 se conserva solo en las fotografías grandes y las del carrusel, y cada pieza de la galería usa un único trigger que combina entrada y parallax en vez de dos. Se anima solo `transform` y `opacity`. Los 34 restantes son intrínsecos al diseño; el criterio real de aceptación pasa a ser el FPS medido (tarea 8.1), no el conteo.
- **Perder el editor de Wix.** El cliente deja de poder cambiar textos por su cuenta → **Mitigación:** el contenido vive en archivos de contenido separados de los componentes; si esto se vuelve un problema real, se conecta un CMS headless en un cambio posterior sin tocar la capa visual.
- **Dos fuentes web más el video en el hero compiten por el ancho de banda inicial** → **Mitigación:** subsetting de Bodoni Moda a latín, `font-display: swap`, precarga solo del peso usado en el hero, y `preload="none"` en el video.

## Migration Plan

1. Construir el mockup como Artifact y aprobarlo con el cliente. Nada más avanza hasta que la dirección visual esté firmada.
2. Levantar el proyecto Astro y transcribir los tokens aprobados a `tailwind.config`.
3. Implementar shell → hero → resto de secciones, con contenido y assets placeholder.
4. Sustituir placeholders por los assets definitivos de la sesión de foto/video.
5. Auditar rendimiento y accesibilidad; ajustar contra los umbrales del spec.
6. Desplegar en una URL de staging. El sitio de Wix sigue en producción durante todo este tiempo — no hay corte.
7. El cambio de DNS y los redirects desde las URLs de Wix son un cambio posterior; el rollback en esa etapa es no mover el DNS.

## Open Questions

- ¿El teléfono y el horario del footer siguen siendo los de Wix (`200 N. Elm Street, Tomball, TX 77375`, Mar–Sáb 11am–9pm / Dom–Lun 11am–5pm)? Se asume que sí; corregirlo es editar contenido, no diseño.
- ¿Hay licencia de GSAP Club para SplitText, o se usa SplitType? No cambia la arquitectura (ver D3).
- ¿El aviso de breakfast tacos se conserva? Se asume que sí, reubicado como línea discreta en el hero en lugar del marquee.
