## Purpose

Define el lenguaje visual compartido del sitio de Tejas Chocolate + Barbecue: escala tipográfica, paleta, ritmo de espaciado, formas y tratamiento de imagen. Cualquier sección o componente toma sus valores de aquí para que el sitio se lea como una sola pieza editorial.

## ADDED Requirements

### Requirement: Jerarquía tipográfica de dos familias

El sitio SHALL usar exactamente dos familias tipográficas: una serif didone de alto contraste para titulares y cifras de exhibición, y una sans geométrica para navegación, microcopy y texto corrido. Ninguna tercera familia SHALL aparecer en la interfaz.

Los titulares SHALL renderizarse en minúsculas (incluida la primera letra), con interlineado entre 1.40 y 1.50 y sin tracking añadido. El texto de navegación, botones y etiquetas SHALL renderizarse en mayúsculas con tracking de al menos 0.12em.

#### Scenario: Titular de sección

- **WHEN** se renderiza el titular de cualquier sección de la home
- **THEN** usa la serif didone, en minúsculas, interlineado entre 1.40 y 1.50
- **AND** su tamaño en desktop es de al menos 56px

#### Scenario: Etiqueta de navegación

- **WHEN** se renderiza un enlace del header, del footer o el texto de un botón
- **THEN** usa la sans geométrica, en mayúsculas, con tracking ≥ 0.12em
- **AND** su tamaño está entre 12px y 14px

#### Scenario: Texto corrido

- **WHEN** se renderiza un párrafo descriptivo
- **THEN** usa la sans geométrica en caja baja, con interlineado ≥ 1.7
- **AND** su ancho de medida no excede 68 caracteres

### Requirement: Peso tipográfico legible

La serif didone SHALL renderizarse en un peso de al menos 600 y con el tamaño óptico fijado a un valor bajo (entre 14 y 28), de modo que sus trazos finos engrosen y el contraste entre asta gruesa y delgada baje. El peso regular (400) NO SHALL usarse en titulares: a tamaño de exhibición sus trazos finos se adelgazan hasta volverse ilegibles.

La sans geométrica SHALL renderizarse en peso 600 para etiquetas, navegación y botones, y en peso 500 para texto corrido.

#### Scenario: Titular de exhibición

- **WHEN** se renderiza un titular en la serif didone
- **THEN** su peso es ≥ 600 y su tamaño óptico está fijado entre 14 y 28

#### Scenario: Palabra de oficio a tamaño máximo

- **WHEN** se renderiza una palabra de sección a más de 96px
- **THEN** su peso es ≥ 700, porque el adelgazamiento de trazo crece con el tamaño

#### Scenario: Microcopy

- **WHEN** se renderiza una etiqueta, un enlace de navegación o el texto de un botón
- **THEN** su peso es ≥ 600

### Requirement: Escala tipográfica fluida

Los tamaños de titular SHALL escalar de forma continua entre el ancho mínimo y máximo de viewport, sin saltos bruscos entre breakpoints. El titular mayor SHALL medir entre 32px y 40px en un viewport de 375px, y entre 64px y 88px en un viewport de 1440px.

#### Scenario: Titular en móvil

- **WHEN** el viewport mide 375px de ancho
- **THEN** el titular de hero se renderiza entre 32px y 40px
- **AND** no se desborda horizontalmente ni provoca scroll lateral

#### Scenario: Titular en desktop

- **WHEN** el viewport mide 1440px de ancho
- **THEN** el titular de hero se renderiza entre 64px y 88px

### Requirement: Paleta de neutros cálidos con acento rojo Tejas

El rojo es la identidad heredada de la marca y SHALL conservarse como color de acento del sitio. La paleta SHALL constar de: un fondo **casi blanco** de tinte cálido, un fondo alterno apenas más cálido, un tinta casi negro cálido para texto, un blanco cálido para texto sobre fondo oscuro, un **rojo Tejas** como acento principal, una variante roja profunda para estados pesados, una variante roja clara legible sobre fondo oscuro, y un guinda profundo (oxblood) para las franjas oscuras.

El fondo principal SHALL tener una luminosidad de al menos 96% en HSL. Un fondo beige o hueso saturado pesa la página y cancela el aire que da la estructura: el color lo pone la fotografía, no el papel.

El acento rojo SHALL usarse en trazos, subrayados, numeración, etiquetas de sección, estados de hover y en la franja de orden. NO SHALL usarse como fondo de una sección de contenido largo ni como color de párrafo. La paleta NO SHALL derivar hacia marrones ni cafés oscuros: el café lee como una marca distinta.

#### Scenario: Contraste de texto

- **WHEN** se renderiza cualquier texto sobre su fondo previsto
- **THEN** la razón de contraste cumple WCAG AA (≥ 4.5:1 para texto normal, ≥ 3:1 para texto ≥ 24px)

#### Scenario: Luminosidad del fondo

- **WHEN** se mide el fondo principal del sitio
- **THEN** su luminosidad en HSL es ≥ 96%

#### Scenario: Rojo sobre fondo claro

- **WHEN** se renderiza texto o un trazo en el acento rojo sobre el fondo hueso o crema
- **THEN** su contraste es ≥ 4.5:1

#### Scenario: Rojo sobre fondo oscuro

- **WHEN** se renderiza el acento rojo sobre una franja oscura
- **THEN** se usa la variante clara, cuyo contraste contra esa franja es ≥ 4.5:1

#### Scenario: Uso del acento

- **WHEN** se aplica el color acento
- **THEN** se aplica a un trazo, subrayado, numeración, etiqueta, ícono, estado de hover o a la franja de orden
- **AND** no se usa como fondo de una sección de contenido largo

### Requirement: Ritmo de espaciado amplio

El espaciado SHALL derivarse de una escala base de 8px. Las secciones de la home SHALL tener un padding vertical de al menos 80px en móvil y al menos 120px en desktop, y las secciones de apertura SHALL admitir hasta 200px. El contenido SHALL respetar un margen lateral mínimo de 24px en móvil y estar contenido en un ancho máximo de 1440px en desktop.

#### Scenario: Separación entre secciones

- **WHEN** dos secciones consecutivas se renderizan en desktop
- **THEN** existe al menos 120px de espacio vertical entre el último elemento de una y el primero de la siguiente

#### Scenario: Margen lateral en móvil

- **WHEN** el viewport mide menos de 640px
- **THEN** ningún contenido toca el borde de la pantalla a menos de 24px, salvo los elementos deliberadamente a sangre

### Requirement: Máscaras de arco y pétalo

Las fotografías SHALL presentarse enmascaradas en una de estas formas, todas derivadas del arco:

- **círculo** — radio 50%, proporción 1:1
- **arco** — lado superior abovedado, base recta
- **hoja** — una sola esquina con radio ≥ 50% del lado, el resto casi recto
- **pétalo** — la hoja espejeada sobre la esquina opuesta
- **domo** — un lado completo redondeado en semicírculo, el opuesto recto
- **suave** — rectángulo de esquinas de 16–24px, permitido solo para piezas secundarias de una retícula

El rectángulo de esquinas suaves NO SHALL usarse para una fotografía protagonista: la forma es parte de la identidad y un rectángulo redondeado lee como plantilla genérica. Una misma sección SHALL alternar al menos dos formas distintas.

Los fondos a sangre SHALL cubrir el 100% del ancho del viewport.

Los botones SHALL existir en dos variantes: circular de 112–128px de diámetro con borde de 1px y etiqueta centrada, y textual con subrayado de 1–2px. NO SHALL usarse botones rectangulares rellenos de color.

#### Scenario: Máscara de foto protagonista

- **WHEN** se renderiza la fotografía principal de una sección
- **THEN** está enmascarada como círculo, arco, hoja, pétalo o domo
- **AND** no es un rectángulo de esquinas suaves

#### Scenario: Variedad dentro de una sección

- **WHEN** una sección presenta tres o más fotografías
- **THEN** usa al menos dos formas de máscara distintas

#### Scenario: Variante de botón

- **WHEN** se renderiza una llamada a la acción primaria
- **THEN** es un botón circular con borde de 1px, sin relleno sólido
- **AND** su etiqueta está en mayúsculas con tracking amplio
