# a-la-carta
Resolución challenge Frontend-Angular :rocket:
 
## Instalación 
Correr 'npm install' :octocat:

## Situación Inicial:

**Alacarta** es un restaurante con más de 40 años de trayectoria, conocido por ofrecer platos de gran calidad y un menú variado que satisface a una amplia gama de clientes. Ahora, **Alacarta** busca modernizar su servicio ofreciendo su menú en línea a través de una aplicación web.

## Objetivo:
Desarrollar una **aplicación web** para gestionar y visualizar el menú de **A la carta**, consumiendo una **API externa** para obtener la información de los platos, y mostrando detalles como características, precio acumulativo, y promedios de tiempo de preparación y salud de cada plato.

## Requerimientos Funcionales:

### **Pantalla de Home**:
- Mostrar una lista de los platos que conforman el menú.
- **Acumulativo de precio del menú**.
- **Promedio de tiempo de preparación** de todos los platos.
- **Promedio de Health Score** de los platos.
- El menú debe contener **4 platos**, con 2 veganos y 2 no veganos. Se validará al agregar nuevos platos.
- Posibilidad de **eliminar platos del menú**, actualizando los promedios y acumulativos.

### **Requerimientos Técnicos**:
Aprovechando las características de Angular, deberán crearse las siguientes secciones y modularizar las mismas en componentes reutilizables. 
Además, para el manejo de peticiones HTTP deberá utilizarse **HttpClient**. 
El sitio deberá ser **responsive** y utilizar Bootstrap o cualquier otro framework como punto de partida para aprovechar sus características.

### **Módulos y Funcionalidades**:

#### 1. **Formulario de Login**:
El formulario deberá renderizarse para ingresar a cualquier ruta si el usuario no está autenticado, conteniendo los campos:
- Email
- Password
- Botón de “Enviar”.
- Al hacer clic en "Enviar", validar con **ReactiveFormsModule** que ambos campos no estén vacíos y mostrar un mensaje al usuario si lo estuviesen.
- Si los datos son correctos, obtener un **token** realizando una petición **POST** a la API, con los campos email y password en el BODY.
- **Feedback al usuario**: 
  - Mientras se procesa la petición de login, se debe mostrar algún tipo de **feedback visual** (por ejemplo, un indicador de carga o un mensaje de "Procesando...").
  - El botón de **login** debe **deshabilitarse temporalmente** para evitar que el usuario intente hacer clic nuevamente antes de recibir la respuesta.

- **Manejo de errores**:
  - Si la API devuelve un error, se debe mostrar una **alerta** utilizando **SweetAlert** para informar al usuario sobre el problema.
  
- **Login exitoso**:
  - Si la autenticación es exitosa, se debe **redirigir al Home**.
  - El **token de acceso** obtenido debe ser **almacenado en `localStorage`** para permitir el acceso a las rutas protegidas de la aplicación.

#### 2. **Platos**:
- El Home mostrará un listado de platos.
- Cada plato tendrá: nombre, imagen, características y acciones (detalles y eliminar).
  
#### 3. **Buscador de Platos**:
- Formulario para realizar una búsqueda por nombre de plato.
- Solo buscar si el filtro tiene más de 2 caracteres, utilizando **debounce**.
- Mostrar los resultados en un grid.

#### 4. **Detalle del Plato**:
- Al hacer clic en un plato, mostrar los detalles de los campos acumulados y promediados en el menú.

#### 5. **Navegación**:
- Las rutas deberán estar protegidas, asegurando que el usuario esté autenticado mediante el **token** en **localStorage**.
- Si el usuario no está autenticado, se redirigirá al login.
- Para el manejo de rutas se deberá utilizar **RouterModule** y **Guards**.
  
### Criterios a Evaluar:

- **Almacenamiento y consulta del token en localStorage**.
- **Peticiones a los endpoints de autenticación de la API**.
- **Utilizar servicios** para el manejo de estado de la aplicación.
- **Actualizar el estado de la aplicación** si el usuario está autenticado.
- **Generar un mensaje** para informar al usuario mientras hace una operación.
- **Crear componentes de formularios** con campos tipo texto y numérico que persistan el input del usuario en el estado.  
  Ejemplo: nombre de usuario, password, datos personales.
- **Validar el contenido de los campos de formularios**.
- **Desarrollar componentes** que puedan mostrar datos recibidos por propiedades (**Input/Output**).
- **Renderizar una lista** recibida por input realizando una iteración sobre la misma.
- **Desarrollar la navegación** con las validaciones correspondientes.
- **Renderizar el contenido de forma dinámica** según la ruta actual de la aplicación.
- **Utilizar un framework de frontend** para estandarizar los estilos de los elementos visuales en la aplicación (por ejemplo **Bootstrap**, **Bulma**, **Tailwind**, etc).
- Utilizando **HttpClient**, realizar **peticiones HTTP** desde los componentes.  
  Ejemplo: **GET** y **POST**.
- **Manejar las excepciones** en el caso de que las peticiones no puedan realizarse correctamente.
- Agregar **elementos visuales** (como alerta, editor de texto enriquecido) utilizando un **SDK específico** en base a los requerimientos.

