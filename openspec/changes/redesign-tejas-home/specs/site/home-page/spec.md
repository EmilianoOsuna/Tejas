## Purpose

Define la composición, el orden, el contenido y el comportamiento responsivo de la home rediseñada de Tejas Chocolate + Barbecue: qué secciones existen, qué comunica cada una y cómo se reorganizan entre móvil y desktop.

## ADDED Requirements

### Requirement: Orden y composición de secciones

La home SHALL presentar las siguientes secciones en este orden exacto: hero, declaración de marca, platillo de portada, carrusel de destacados, oficio del chocolate, oficio de la barbacoa, pantalla de llamada a la acción, galería masonry, franja de cita, merch, contacto, franja de orden y footer.

La home SHALL tener entre 11 y 14 secciones. No SHALL volcarse el catálogo completo del menú en la home.

#### Scenario: Recorrido completo

- **WHEN** la persona recorre la home de arriba abajo
- **THEN** encuentra hero, declaración, platillo de portada, destacados, los dos oficios, llamada a la acción, galería, cita, merch, contacto, franja de orden y footer en ese orden

### Requirement: Una idea por pantalla

Al menos seis secciones de la home SHALL ocupar la altura completa del viewport (`100dvh`) y contener **una sola idea**: un titular, o una fotografía con una palabra, o una fotografía con una llamada a la acción. Ninguna de esas secciones SHALL contener más de un titular, un párrafo breve, una fotografía y un control.

La densidad es lo que separa este sitio de una plantilla: una sección que apila titular, párrafo, lista y dos botones lee como plantilla por mucho que su tipografía sea correcta.

El contenido completo de cada una de estas secciones SHALL ser visible dentro del viewport sin desplazamiento interno y sin recorte. Para lograrlo, el tamaño de fotografías, titulares, botones y espacios SHALL estar acotado tanto por una medida de ancho como por una de altura relativa al viewport, no solo por el ancho.

La sección SHALL usar `min-height`, nunca `height` con `overflow: hidden`: contenido recortado tampoco es contenido visible, de modo que ante un caso extremo la sección SHALL crecer en lugar de ocultar lo que no cabe.

Por debajo de 560px de altura de viewport la restricción de altura completa SHALL levantarse y la sección SHALL fluir con su contenido: forzar una fotografía, una palabra de exhibición y una línea de texto en esa altura los reduciría a un tamaño ilegible.

#### Scenario: Sección a pantalla completa

- **WHEN** se renderiza una sección de idea única en un viewport de 1440x900
- **THEN** ocupa los 900px de alto
- **AND** su contenido está centrado vertical y horizontalmente

#### Scenario: Todo el contenido cabe

- **WHEN** se renderiza una sección de idea única en cualquier viewport de al menos 560px de alto
- **THEN** todo su contenido es visible dentro de esa altura
- **AND** ni la sección ni ninguno de sus hijos genera scroll interno
- **AND** ningún elemento queda recortado

#### Scenario: Viewport corto

- **WHEN** el viewport mide menos de 560px de alto
- **THEN** la sección fluye con su contenido en lugar de forzar la altura completa
- **AND** ningún texto se reduce por debajo de su tamaño mínimo legible

#### Scenario: Caso extremo de contenido

- **WHEN** el contenido de una sección de idea única excede la altura del viewport
- **THEN** la sección crece para contenerlo
- **AND** no lo recorta

#### Scenario: Densidad máxima

- **WHEN** se renderiza una sección de idea única
- **THEN** contiene como máximo un titular, un párrafo breve, una fotografía y un control

#### Scenario: Conteo de pantallas

- **WHEN** se recorre la home completa
- **THEN** al menos seis de sus secciones ocupan la altura completa del viewport

#### Scenario: Menú no volcado

- **WHEN** se renderiza la home
- **THEN** no aparece el catálogo completo de platillos
- **AND** el menú se representa mediante destacados curados más un enlace al menú completo

### Requirement: Hero a pantalla completa

El hero SHALL ocupar el 100% de la altura del viewport y presentar, centrado y superpuesto sobre un video o fotografía a sangre: el logotipo de Tejas, un titular en minúsculas de una sola frase y una llamada a la acción primaria.

El fondo del hero SHALL ser fotografía o video real. NO SHALL sustituirse por gráficos generados —canvas, SVG, gradientes o patrones— ni en producción ni como recurso provisional presentado como definitivo.

El medio de fondo SHALL llevar una capa de oscurecimiento suficiente para que el texto blanco encima cumpla contraste AA. Si el video no carga o no puede reproducirse, SHALL mostrarse un póster estático en su lugar.

El hero NO SHALL contener una barra marquee de anuncios.

#### Scenario: Hero en desktop

- **WHEN** la home carga en un viewport de 1440x900
- **THEN** el hero ocupa los 900px de alto
- **AND** logotipo, titular y llamada a la acción están centrados vertical y horizontalmente

#### Scenario: Video no disponible

- **WHEN** el video de fondo no puede cargarse o reproducirse
- **THEN** se muestra una imagen póster que cubre el mismo espacio
- **AND** el titular sigue cumpliendo contraste AA sobre ella

#### Scenario: Video y datos móviles

- **WHEN** la home carga en un viewport menor a 768px
- **THEN** se muestra la imagen póster en lugar del video

#### Scenario: Fondo del hero

- **WHEN** se renderiza el hero
- **THEN** su fondo es un elemento de video o de imagen
- **AND** no es un canvas, un SVG ni un patrón generado

### Requirement: Declaración de marca

Tras el hero SHALL aparecer una sección de declaración de marca: un solo titular largo en minúsculas, centrado, sobre fondo claro, sin imagen de producto ni botones. Su padding vertical SHALL ser de al menos 160px en desktop.

#### Scenario: Declaración aislada

- **WHEN** se renderiza la sección de declaración de marca
- **THEN** contiene únicamente un titular centrado
- **AND** no contiene botones, listas ni fotografías de producto

### Requirement: Historia dual chocolate y barbacoa

La sección de historia SHALL presentar los dos oficios del negocio —chocolate bean-to-bar y barbacoa texana— como dos bloques diferenciados, cada uno con su titular, su párrafo descriptivo y una fotografía enmascarada.

En desktop los dos bloques SHALL alternar el lado de la fotografía (uno a la izquierda, otro a la derecha). En móvil SHALL apilarse verticalmente con la fotografía antes del texto en ambos.

#### Scenario: Alternancia en desktop

- **WHEN** el viewport mide 1024px o más
- **THEN** el bloque de chocolate y el de barbacoa muestran su fotografía en lados opuestos

#### Scenario: Apilado en móvil

- **WHEN** el viewport mide menos de 768px
- **THEN** cada bloque se apila con la fotografía arriba y el texto abajo

### Requirement: Carrusel de platillos destacados

La home SHALL incluir un carrusel de entre 4 y 6 platillos destacados.

El carrusel SHALL ocupar el ancho completo del viewport, con las diapositivas cortándose por ambos bordes de la pantalla en lugar de contenerse dentro del ancho de la retícula. Cada diapositiva SHALL mostrar únicamente una fotografía enmascarada; el nombre del platillo y su descripción SHALL aparecer **debajo del carrusel**, centrados, en tipografía de exhibición, y SHALL actualizarse al cambiar de diapositiva con una transición de opacidad.

El carrusel SHALL mostrar un contador de posición con el formato `<actual> <total>`, una barra de progreso y controles de avance y retroceso de trazo fino. SHALL ser operable con teclado y con gesto de arrastre táctil.

El carrusel SHALL avanzar automáticamente cada 5 segundos y SHALL volver a la primera diapositiva al llegar a la última. Como el avance automático dura más de 5 segundos, SHALL ofrecer un control explícito de pausa y reanudación, y SHALL detenerse mientras el puntero esté encima o mientras cualquier elemento del carrusel tenga el foco (WCAG 2.2.2).

#### Scenario: Avance manual

- **WHEN** la persona activa el control de avance
- **THEN** aparece el siguiente platillo y el contador refleja la nueva posición
- **AND** el nombre y la descripción debajo del carrusel cambian a los del platillo nuevo

#### Scenario: Carrusel a sangre

- **WHEN** se renderiza el carrusel en un viewport de 1440px
- **THEN** sus diapositivas se cortan por ambos bordes de la pantalla
- **AND** no quedan contenidas dentro del ancho máximo de la retícula

#### Scenario: Operación por teclado

- **WHEN** el carrusel tiene el foco y la persona pulsa las flechas izquierda o derecha
- **THEN** el carrusel retrocede o avanza una diapositiva

#### Scenario: Avance automático

- **WHEN** la persona deja el carrusel sin interactuar
- **THEN** avanza una diapositiva cada 5 segundos
- **AND** al pasar la última vuelve a la primera

#### Scenario: Pausa explícita

- **WHEN** la persona activa el control de pausa
- **THEN** el carrusel deja de avanzar solo y el control ofrece reanudar

#### Scenario: Pausa por puntero o foco

- **WHEN** el puntero entra en el carrusel o un elemento suyo recibe el foco
- **THEN** el avance automático se detiene
- **AND** se reanuda al salir el puntero y perderse el foco

#### Scenario: Autoplay y movimiento reducido

- **WHEN** `prefers-reduced-motion: reduce` está activo
- **THEN** el carrusel no avanza solo y el control aparece en estado de reanudar

### Requirement: Galería masonry

La home SHALL incluir una galería en retícula masonry con entre 8 y 12 piezas de alturas distintas, que muestre el local, el equipo, el proceso y los platillos. La galería SHALL admitir tanto fotografía como video en bucle corto, y toda pieza de video SHALL llevar un distintivo visible que la identifique como tal.

Las piezas SHALL alternar entre las formas de máscara definidas por el sistema visual y SHALL llevar un pie de foto breve.

La retícula SHALL renderizarse en 2 columnas por debajo de 720px, 3 columnas entre 720px y 1100px, y 4 columnas por encima de 1100px, sin dejar huecos verticales.

#### Scenario: Retícula en desktop

- **WHEN** el viewport mide 1100px o más
- **THEN** la galería se dispone en 4 columnas de alturas desiguales sin huecos

#### Scenario: Retícula en móvil

- **WHEN** el viewport mide menos de 720px
- **THEN** la galería se dispone en 2 columnas sin scroll horizontal

#### Scenario: Pieza de video

- **WHEN** una pieza de la galería es un video
- **THEN** muestra un distintivo que la identifica como video

#### Scenario: Variedad de forma

- **WHEN** se renderiza la galería
- **THEN** sus piezas usan al menos cuatro formas de máscara distintas

### Requirement: Franja de cita

La home SHALL incluir una franja de cita sobre fondo oscuro o fotografía a sangre, con una sola frase sobre el oficio de la barbacoa en tipografía de exhibición y sin llamadas a la acción.

#### Scenario: Cita renderizada

- **WHEN** se renderiza la franja de cita
- **THEN** muestra una sola frase en tipografía de exhibición sobre fondo oscuro
- **AND** no contiene botones ni enlaces

### Requirement: Sección de merch

La home SHALL presentar entre 3 y 4 productos de merch en una retícula, cada uno con fotografía y nombre, más una llamada a la acción única hacia la tienda completa. No SHALL mostrarse el catálogo completo de merch ni funcionalidad de carrito.

#### Scenario: Retícula de merch

- **WHEN** se renderiza la sección de merch
- **THEN** muestra entre 3 y 4 productos con fotografía y nombre
- **AND** incluye un único enlace hacia la tienda

### Requirement: Sección de contacto

La sección de contacto SHALL mostrar la dirección física, el horario de operación, el teléfono y los enlaces a redes sociales. SHALL incluir un formulario con nombre, correo y mensaje.

El formulario SHALL validar que el correo tenga formato válido y que el mensaje no esté vacío antes de permitir el envío, y SHALL comunicar el resultado del envío —éxito o error— sin recargar la página.

#### Scenario: Envío válido

- **WHEN** la persona envía el formulario con nombre, correo válido y mensaje
- **THEN** se muestra una confirmación de envío en la misma página

#### Scenario: Correo inválido

- **WHEN** la persona intenta enviar con un correo de formato inválido
- **THEN** se muestra un mensaje de error asociado al campo de correo
- **AND** el formulario no se envía

#### Scenario: Fallo de envío

- **WHEN** el envío falla por un error de red o de servidor
- **THEN** se muestra un mensaje de error y el contenido capturado se conserva en los campos

### Requirement: Rendimiento de carga

La home SHALL servir las fotografías en formato moderno y en tamaños adaptados al viewport, con carga diferida para todo lo que esté por debajo del pliegue. El video del hero SHALL cargarse solo en viewports de 768px o más.

El Largest Contentful Paint SHALL ser menor a 2.5 segundos y el Cumulative Layout Shift menor a 0.1 en una conexión 4G simulada.

#### Scenario: Medición de rendimiento

- **WHEN** se audita la home en desktop con red 4G simulada
- **THEN** el LCP es menor a 2.5 segundos y el CLS menor a 0.1

#### Scenario: Carga diferida

- **WHEN** la home termina de cargar sin que la persona haya hecho scroll
- **THEN** las fotografías por debajo del pliegue aún no se han descargado
