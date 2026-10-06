## Purpose

Define cómo se mueve el sitio: la secuencia de entrada, los revelados por scroll, el parallax de fotografía, las interacciones de hover y el contrato de accesibilidad. El movimiento es parte de la identidad del rediseño, no un adorno opcional, por eso su comportamiento se especifica igual que el contenido.

## ADDED Requirements

### Requirement: Scroll suave global

El sitio SHALL interpolar el desplazamiento vertical de forma que el scroll se sienta amortiguado en lugar de instantáneo. La interpolación SHALL alcanzar la posición destino en menos de 1.2 segundos y no SHALL secuestrar el scroll ni forzar saltos a secciones fijas.

La barra de scroll nativa SHALL permanecer funcional y la posición de scroll SHALL seguir siendo consultable por anclas y por el botón de retroceso del navegador.

#### Scenario: Desplazamiento con rueda

- **WHEN** la persona gira la rueda del mouse
- **THEN** la página avanza con desaceleración suave hasta detenerse
- **AND** no se fija ni bloquea en ninguna sección

#### Scenario: Navegación por ancla

- **WHEN** la persona activa un enlace interno hacia una sección de la página
- **THEN** la página se desplaza suavemente hasta esa sección
- **AND** el foco del teclado queda en el destino

### Requirement: Secuencia de entrada

Al cargar la home por primera vez, el sitio SHALL ejecutar una secuencia de entrada: una cortina que cubre el viewport y se retira revelando el hero, seguida de la aparición del logotipo, el titular y la llamada a la acción en ese orden. La secuencia completa SHALL durar como máximo 2.5 segundos.

El contenido SHALL ser legible y el sitio navegable aunque la secuencia falle o se interrumpa: ningún elemento SHALL quedar permanentemente oculto si la animación no se completa.

#### Scenario: Carga normal

- **WHEN** la home carga por primera vez
- **THEN** la cortina se retira y el hero aparece por etapas en 2.5 segundos o menos

#### Scenario: Animación interrumpida

- **WHEN** la secuencia de entrada no llega a ejecutarse por un error de script
- **THEN** el hero y el resto del contenido son visibles y navegables igualmente

#### Scenario: Visitas posteriores en la misma sesión

- **WHEN** la persona vuelve a la home dentro de la misma sesión de navegación
- **THEN** la cortina no se repite y el contenido aparece directamente

### Requirement: Revelado de titulares por scroll

Los titulares de sección SHALL aparecer de forma escalonada por palabra o por línea cuando entran en el viewport, no como un bloque único. El escalonamiento SHALL completarse en menos de 900ms desde que el titular cruza el umbral de entrada.

Cada titular SHALL animarse una sola vez por carga de página; al volver a subir no SHALL reproducirse de nuevo.

#### Scenario: Titular entra en viewport

- **WHEN** un titular de sección alcanza el 80% de la altura del viewport al bajar
- **THEN** sus palabras o líneas aparecen escalonadas hasta quedar completas en menos de 900ms

#### Scenario: Scroll de regreso

- **WHEN** la persona sube y vuelve a bajar sobre un titular ya revelado
- **THEN** el titular permanece visible y no se reanima

### Requirement: Parallax y escala de fotografía

El parallax es una característica central del sitio, no un adorno: es lo que lo hace sentir vivo. SHALL aplicarse sobre fotografía y video, nunca sobre gráficos decorativos, en tres planos distintos:

1. **Fondos a sangre**, incluido el medio del hero — se desplazan a velocidad distinta del contenido, con desfase máximo de 15% de la altura del contenedor.
2. **Fotografías enmascaradas** — escalan dentro de su máscara entre 1.0 y 1.12 conforme avanza el scroll, mientras la máscara permanece inmóvil.
3. **Piezas de la galería masonry** — cada pieza se desplaza a su propia velocidad, de modo que las columnas avanzan desfasadas entre sí.

Ningún efecto de parallax SHALL provocar bandas vacías, dejar ver el borde de la imagen, ni producir scroll horizontal.

#### Scenario: Fondo a sangre en scroll

- **WHEN** la persona se desplaza sobre una sección con fotografía a sangre
- **THEN** la imagen se mueve más lento que el texto encima
- **AND** la imagen cubre el contenedor completo en todo momento

#### Scenario: Máscara inmóvil

- **WHEN** una fotografía enmascarada escala durante el scroll
- **THEN** el contorno de la máscara no cambia de tamaño ni de forma

#### Scenario: Galería desfasada

- **WHEN** la persona se desplaza sobre la galería masonry
- **THEN** las piezas avanzan a velocidades distintas entre sí

#### Scenario: Una sola propiedad por controlador

- **WHEN** una pieza tiene a la vez animación de entrada y parallax por scroll
- **THEN** cada animación controla propiedades distintas y no compiten por la misma

### Requirement: Interacciones de hover

Los botones circulares SHALL responder al puntero con un intercambio vertical de la etiqueta duplicada: la etiqueta visible sale por arriba mientras su copia entra por abajo, en 300ms o menos. Los enlaces textuales SHALL responder con el trazado progresivo de su subrayado.

Toda interacción de hover SHALL tener un equivalente de foco visible para navegación por teclado.

#### Scenario: Hover sobre botón circular

- **WHEN** el puntero entra en un botón circular
- **THEN** la etiqueta se intercambia verticalmente por su copia en 300ms o menos

#### Scenario: Foco por teclado

- **WHEN** la persona llega a un botón o enlace con la tecla Tab
- **THEN** se muestra un indicador de foco visible con contraste ≥ 3:1 contra su fondo

### Requirement: Respeto a movimiento reducido

Cuando el sistema operativo indica preferencia por movimiento reducido, el sitio SHALL desactivar la secuencia de entrada, el parallax en sus tres planos, el escalado de imagen, los revelados escalonados y el avance automático del carrusel. El contenido SHALL mostrarse en su estado final de inmediato.

Las transiciones de color y opacidad de hasta 200ms SHALL permanecer permitidas.

La condición SHALL evaluarse con una sola consulta a `prefers-reduced-motion: reduce`. NO SHALL usarse un par de consultas complementarias (`reduce` y `no-preference`) como puerta de entrada: en un entorno que no reporte ninguna de las dos, ninguna rama se ejecuta y el sitio queda sin su estado final.

#### Scenario: Preferencia de movimiento reducido activa

- **WHEN** `prefers-reduced-motion: reduce` está activo y la persona carga la home
- **THEN** no hay cortina de entrada, parallax, escalado ni revelados escalonados
- **AND** todo el contenido se muestra en su estado final desde el primer render

#### Scenario: Scroll con movimiento reducido

- **WHEN** `prefers-reduced-motion: reduce` está activo y la persona se desplaza
- **THEN** el scroll es el nativo del navegador, sin interpolación

#### Scenario: Entorno que no reporta la preferencia

- **WHEN** el navegador no reporta ni `reduce` ni `no-preference`
- **THEN** el sitio se renderiza completo y legible, sin quedar bloqueado tras un estado intermedio de animación
