## 1. Aprobación de la dirección visual

- [x] 1.1 Construir el mockup de la home como Artifact HTML autocontenido (hero, declaración, historia dual, carrusel, cita, merch, contacto, footer) con los tokens de D2 y las animaciones de D3, y verificar que se navega por scroll de principio a fin en desktop y en 375px sin scroll horizontal
- [x] 1.2 Revisar el mockup con el cliente y registrar la aprobación o los ajustes solicitados; verificar que existe una decisión escrita antes de continuar con el grupo 2
- [x] 1.3 Aplicar los ajustes solicitados al mockup y verificar que la versión republicada refleja cada punto de la lista de ajustes

## 2. Andamiaje del proyecto

- [x] 2.1 Inicializar el proyecto Astro con `@astrojs/tailwind` y verificar que `npm run build` genera salida estática sin errores
- [x] 2.2 Instalar `gsap`, `lenis` y `swiper`, y verificar que quedan fijadas a versión exacta en `package.json`
- [x] 2.3 Transcribir a `tailwind.config` los tokens aprobados (colores, familias, escala fluida de display, escala de spacing de sección) y verificar renderizando una página de prueba que cada token emite el valor esperado
- [x] 2.4 Configurar la carga de Bodoni Moda y Montserrat con subsetting latino, `font-display: swap` y precarga solo del peso del hero; verificar en la pestaña de red que no se descargan pesos ni subsets no usados
- [x] 2.5 Crear el layout base con `<html lang>`, metadatos, datos estructurados de `Restaurant` y enlace de salto al contenido; verificar que el enlace de salto es el primer elemento enfocable con Tab

## 3. Sistema visual

- [x] 3.1 Implementar los estilos base de tipografía (display en minúsculas peso 600 con `opsz` fijado en 18, 700 en las palabras de oficio; body peso 600 con tracking 0.18em en nav y etiquetas, 500 en texto corrido) y verificar contra los escenarios de `site/visual-system` en 375px y 1440px
- [x] 3.2 Implementar el componente de botón circular de 120px con etiqueta duplicada y `aria-hidden` en la copia, y verificar con lector de pantalla que la etiqueta se anuncia una sola vez
- [x] 3.3 Implementar el componente de enlace textual con subrayado de 1px y su estado de foco visible, y verificar contraste ≥ 3:1 del indicador de foco
- [x] 3.4 Implementar el componente de imagen con las seis máscaras de arco (círculo, arco, hoja, pétalo, domo, suave) sobre `<picture>` con AVIF/WebP y tamaños responsivos, y verificar que ninguna variante deforma la relación de aspecto ni recorta el sujeto de la foto
- [x] 3.5 Verificar con un checker automatizado que todos los pares texto/fondo de los tokens cumplen WCAG AA, incluidos rojo sobre hueso, rojo sobre crema y rojo claro sobre guinda

## 4. Shell del sitio

- [x] 4.1 Implementar el header fijo con logotipo centrado y máximo 5 destinos más el CTA de orden; verificar que permanece visible y activable al final de la página
- [x] 4.2 Implementar el cambio claro/oscuro del header según el fondo de la sección bajo él, en ≤ 300ms; verificar recorriendo la home que no hay parpadeo en las transiciones
- [x] 4.3 Implementar el panel de menú móvil a pantalla completa con bloqueo de scroll de fondo, contención de foco, cierre con Escape y retorno de foco al disparador; verificar cada uno de los tres escenarios de `site/shell` solo con teclado
- [x] 4.4 Implementar la franja de orden (teléfono `tel:` a la izquierda, CTA de orden a la derecha, fondo oscuro) y verificar que en móvil se apila con el teléfono primero
- [x] 4.5 Implementar el footer en 3–4 columnas en desktop y una en móvil, con año de derechos calculado; verificar que a 375px no produce scroll horizontal

## 5. Sistema de movimiento

- [x] 5.1 Gatear toda inicialización de animación con una sola consulta `matchMedia('(prefers-reduced-motion: reduce)').matches` (nunca un par complementario, ver D11), y verificar que con la preferencia activa no se registra ningún ScrollTrigger y que sin soporte de la consulta el sitio se ve completo
- [x] 5.2 Inicializar Lenis solo fuera de movimiento reducido, con llegada al destino en < 1.2s; verificar que las anclas internas desplazan y dejan el foco en el destino
- [x] 5.3 Implementar la secuencia de entrada (cortina, logotipo, titular, CTA) en ≤ 2.5s, con la cortina oculta por CSS por defecto y un `setTimeout` de piso duro que la retira pase lo que pase (D11), y marca en `sessionStorage` para no repetirla; verificar que al navegar y volver dentro de la sesión la cortina no reaparece y que bloqueando GSAP la página sigue navegable
- [x] 5.4 Verificar que, deshabilitando JavaScript en el navegador, el hero y todas las secciones son visibles y navegables (estados iniciales escritos visibles en el HTML, según D4)
- [x] 5.5 Implementar el revelado escalonado de titulares por palabra o línea con SplitText/SplitType, `once: true` y duración total < 900ms; verificar que al subir y volver a bajar el titular no se reanima
- [x] 5.6 Implementar el parallax en sus tres planos: fondos a sangre incluido el medio del hero (desfase ≤ 15%), imágenes enmascaradas (escala 1.0 → 1.12 con la máscara inmóvil) y piezas de la galería a velocidades distintas; verificar que en ningún punto se ve el borde de una imagen, una banda vacía ni scroll horizontal
- [x] 5.9 Verificar que ninguna pieza con entrada y parallax simultáneos tiene dos tweens sobre la misma propiedad (el scrub controla `y`, la entrada solo la opacidad)
- [x] 5.7 Implementar el intercambio vertical de etiqueta en hover del botón circular en ≤ 300ms y el trazado del subrayado en enlaces; verificar que ambos tienen equivalente de foco por teclado
- [x] 5.8 Recortar los ScrollTriggers a lo que aporta visualmente (escala solo en fotos grandes y carrusel, una sola instancia por pieza de galería) y verificar el conteo final contra el HTML construido

## 6. Secciones de la home

- [x] 6.1 Implementar el hero a altura de viewport con `<video>` condicionado a ≥ 768px, póster AVIF/WebP con `fetchpriority="high"`, capa de oscurecimiento y CTA circular; verificar que el fondo es un elemento de video o imagen y no un canvas, SVG ni patrón generado, que a < 768px no se descarga el video, y que el titular cumple AA sobre el póster
- [x] 6.2 Implementar el fallback del hero cuando el video falla al cargar o reproducirse, y verificar bloqueando la petición del video que el póster cubre el mismo espacio sin salto de layout
- [x] 6.3 Implementar la sección de declaración de marca como pantalla completa con un solo titular centrado y verificar que no contiene botones, listas ni fotos de producto
- [x] 6.4 Implementar los dos oficios como pantallas completas independientes (etiqueta, palabra gigante, una foto, un párrafo breve), más la pantalla de platillo de portada y la de llamada a la acción; verificar los tres escenarios de "Una idea por pantalla"
- [x] 6.5 Implementar el carrusel de 4–6 destacados a sangre con Swiper (diapositivas cortándose por ambos bordes del viewport, solo foto en la diapositiva, nombre y descripción centrados debajo con transición de opacidad), más contador, barra de progreso, flechas de trazo fino, arrastre táctil, teclado y autoplay de 5s con bucle; verificar los escenarios de avance manual, carrusel a sangre, teclado y avance automático
- [x] 6.10 Implementar los controles de pausa del carrusel exigidos por WCAG 2.2.2: botón explícito de pausa/reanudar, pausa en hover y en foco, y sin autoplay bajo movimiento reducido; verificar los tres escenarios de pausa del spec
- [x] 6.11 Implementar la galería masonry de 8–12 piezas con CSS `columns` (2/3/4 según viewport), máscaras alternadas, pies de foto y distintivo en las piezas de video; verificar los cuatro escenarios de `site/home-page` y que no quedan huecos verticales
- [x] 6.6 Implementar la franja de cita sobre fondo oscuro sin CTAs y verificar que no contiene enlaces
- [x] 6.7 Implementar la retícula de merch con 3–4 productos y un único enlace a la tienda existente; verificar que no hay carrito ni catálogo completo
- [x] 6.8 Implementar la sección de contacto con dirección, horario, teléfono, redes y formulario de nombre/correo/mensaje; verificar que el layout se apila correctamente en móvil
- [x] 6.9 Conectar el formulario al endpoint de terceros con validación de formato de correo y mensaje no vacío, y estados de éxito y error sin recarga; verificar los tres escenarios de envío del spec, incluido el de fallo de red con los campos conservados

## 7. Contenido y assets

- [x] 7.1 Extraer el copy reutilizable del sitio de Wix a archivos de contenido del repo y verificar que ningún texto queda escrito dentro de un componente
- [ ] 7.2 Redactar el copy nuevo de hero, declaración de marca y cita; verificar que los tres están aprobados por el cliente antes de sustituir los placeholders
- [x] 7.3 Levantar la dependencia de sesión de foto y video con la lista de tomas requeridas (hero en video, 2 fotos de historia, 4–6 de platillos, 3–4 de merch, 8–12 de galería con 2 videos en bucle corto de local/proceso/equipo) y verificar que se entregan en las resoluciones y encuadres pedidos, con margen de encuadre suficiente para las máscaras de arco
- [ ] 7.4 Procesar los assets definitivos a AVIF/WebP con los tamaños responsivos definidos y comprimir el video a ≤ 3MB y el póster a ≤ 120KB; verificar los pesos finales en la pestaña de red
- [ ] 7.5 Sustituir todos los placeholders por los assets definitivos y verificar que no queda ninguna referencia a archivos de placeholder en el build

## 8. Verificación final

- [ ] 8.1 Auditar la home con Lighthouse en red 4G simulada sobre el build con assets definitivos y verificar LCP < 2.5s, CLS < 0.1 y ≥ 50fps de scroll en perfil de CPU 4x throttled
- [x] 8.2 Recorrer la home completa solo con teclado y con lector de pantalla, y verificar que el orden de tabulación sigue el orden visual y que todos los destinos son alcanzables
- [x] 8.3 Verificar la home en 375px, 768px, 1024px y 1440px, comprobando que ninguna vista produce scroll horizontal y que las secciones de idea única siguen ocupando la altura completa del viewport
- [x] 8.6 Verificar que al menos seis secciones ocupan `100dvh`, que ninguna excede el máximo de un titular, un párrafo, una foto y un control, y que en 1440x900, 1440x700, 1024x640 y 390x844 todo su contenido cabe sin scroll interno ni recorte
- [ ] 8.4 Verificar la home en Chrome, Safari y Firefox, comprobando que las animaciones y las máscaras de imagen se comportan igual en los tres
- [x] 8.5 Ejecutar `openspec validate --strict` sobre el cambio y verificar que no reporta errores
