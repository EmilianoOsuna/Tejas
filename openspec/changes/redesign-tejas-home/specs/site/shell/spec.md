## Purpose

Define el marco persistente del sitio —header con navegación, menú móvil y footer— que envuelve la home y cualquier ruta que se agregue después, de modo que la navegación y el cierre de página sean consistentes en todo el sitio.

## ADDED Requirements

### Requirement: Header persistente con logotipo centrado

El header SHALL estar fijo sobre el contenido durante todo el scroll y SHALL presentar el logotipo centrado con los enlaces de navegación repartidos a ambos lados en desktop.

Sobre secciones de fondo oscuro el header SHALL renderizarse en versión clara; sobre secciones de fondo claro, en versión oscura. El cambio SHALL ocurrir en 300ms o menos y sin parpadeo.

El header SHALL contener como máximo 5 destinos de navegación más una llamada a la acción de orden.

#### Scenario: Header sobre hero oscuro

- **WHEN** la persona está en la parte superior de la home, sobre el hero
- **THEN** el logotipo y los enlaces se renderizan en color claro

#### Scenario: Header sobre sección clara

- **WHEN** la persona se desplaza hasta una sección de fondo claro
- **THEN** el logotipo y los enlaces se renderizan en color oscuro en 300ms o menos

#### Scenario: Header permanece accesible

- **WHEN** la persona se desplaza hasta el final de la página
- **THEN** el header sigue visible y sus enlaces siguen siendo activables

### Requirement: Menú móvil

En viewports menores a 1024px la navegación SHALL colapsarse en un disparador que abre un panel a pantalla completa con los mismos destinos, la llamada a la acción de orden y los enlaces de redes sociales.

Con el panel abierto, el scroll del documento de fondo SHALL bloquearse y el foco del teclado SHALL quedar contenido dentro del panel. La tecla Escape SHALL cerrarlo y devolver el foco al disparador.

#### Scenario: Apertura del panel

- **WHEN** el viewport mide menos de 1024px y la persona activa el disparador
- **THEN** se abre un panel a pantalla completa con todos los destinos de navegación
- **AND** el contenido de fondo deja de desplazarse

#### Scenario: Cierre con Escape

- **WHEN** el panel está abierto y la persona pulsa Escape
- **THEN** el panel se cierra y el foco regresa al disparador

#### Scenario: Foco contenido

- **WHEN** el panel está abierto y la persona recorre los elementos con Tab
- **THEN** el foco cicla dentro del panel y no alcanza el contenido de fondo

### Requirement: Franja de orden en el footer

Sobre el footer SHALL aparecer una franja de fondo oscuro con el teléfono del restaurante a la izquierda, en tipografía de exhibición, y una llamada a la acción de orden a la derecha, también en tipografía de exhibición y con subrayado.

En móvil los dos elementos SHALL apilarse, con el teléfono primero.

#### Scenario: Franja en desktop

- **WHEN** el viewport mide 1024px o más
- **THEN** el teléfono aparece a la izquierda y la llamada a la acción de orden a la derecha, sobre fondo oscuro

#### Scenario: Teléfono activable

- **WHEN** la persona activa el teléfono desde un dispositivo móvil
- **THEN** se inicia una llamada al número del restaurante

### Requirement: Footer informativo

El footer SHALL mostrar en columnas: el nombre y la dirección del restaurante, el horario de operación, los destinos de navegación y los enlaces a redes sociales, además del aviso de derechos con el año vigente.

En desktop SHALL disponerse en 3 o 4 columnas; en móvil SHALL apilarse en una sola columna.

#### Scenario: Footer en desktop

- **WHEN** el viewport mide 1024px o más
- **THEN** el footer se dispone en 3 o 4 columnas

#### Scenario: Footer en móvil

- **WHEN** el viewport mide menos de 768px
- **THEN** el footer se apila en una sola columna sin scroll horizontal

### Requirement: Navegación accesible

Todos los destinos del header, del menú móvil y del footer SHALL ser alcanzables y activables con teclado, en un orden de tabulación que siga el orden visual. El disparador del menú móvil SHALL comunicar su estado abierto o cerrado a las tecnologías de asistencia.

El sitio SHALL ofrecer un enlace de salto al contenido principal como primer elemento enfocable.

#### Scenario: Salto al contenido

- **WHEN** la persona pulsa Tab al cargar la página
- **THEN** el primer elemento enfocable es un enlace de salto al contenido principal

#### Scenario: Estado del disparador

- **WHEN** el panel móvil está abierto
- **THEN** el disparador comunica su estado expandido a las tecnologías de asistencia
