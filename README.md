# Plataforma de E-commerce
Caso de Estudio: Desarrollo de una plataforma web e-commerce y despliegue en Amazon Web Service (AWS).
Este proyecto es una plataforma de Ecommerce enfocada en la compra y administración de películas y series. Permite a los usuarios explorar diferentes títulos, ver detalles de cada película y realizar compras. Además, los administradores pueden editar información de los productos. Este proyecto está construido de la siguiente manera:
    HTML y Tailwind CSS para el frontend.


## Estructura del proyecto

✅ Página para inicio de sesión.
✅ Página para registrarse.
✅ Menú lateral interactivo con opciones de navegación.
✅ Navbar con perfil de usuario e imagen.
✅ Página principal con listado de películas.
✅ Página de detalles de la película con botones de compra y edición.

![alt text](image-7.png)

## Tecnologias del Proyecto
Lenguajes de Programación: HTML5, Javascript
Frameworks: Vite con React
Estilos: Tailwind Css


## Descripción

![alt text](image-8.png)
Esta es la página de inicio, cuenta con un login, un botón para registrarse y si se le olvida la contraseña.

![alt text](image-9.png)
![alt text](image-14.png)
Aqui se muestra un ejemplo de la validación del login

![alt text](image-12.png)
Validacion en el correo

![alt text](image-10.png)
Se muestra el formulario de Registro.

![alt text](image-11.png)
![alt text](image-13.png)
Y las validaciones en el mismo formulario


A continuación se muestran fotos de la aplicación hasta el momento
![alt text](image-6.png)

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)

![alt text](image-5.png)

Comando para instalar react Router y asi convertir el frontend en un SPA
![alt text](image-15.png)

Se agregó un folder de routes y dentro de esta se creo un archivo routes.jsx en donde se definen las rutas de la aplicacion
![alt text](image-16.png)
![alt text](image-17.png)

Para las rutas se creo un archivo privateRoutes para que el usuario pone una ruta en el buscador, este lo redigira al login.
![alt text](image-19.png)

Las rutas principales en el proyecto son las siguientes:

/login: Página de inicio de sesión.
/home: Página principal de la aplicación.
/movies/:id: Detalles de una película específica.
/dashboard: Panel de control (requiere autenticación).
/add-movie: Página para agregar una nueva película (requiere autenticación).
/edit-movie/:id: Página para editar una película existente (requiere autenticación).

Tambien se creo un archivo db.json para manejar los datos de las peliculas, la cual utiliza http://localhost:3000/movies
![alt text](image-18.png)

La cual consume el siguiente servicio peliculasService.js, en donde por el momento tenemos GetMovies, GetMovieById y updateMovie
![alt text](image-20.png)




## Backend

Se creo una carpeta dentro del proyecto para manejar el backend, en este caso utilice MongoDB como mi gestor de Base de Datos, Node.js y Express.

Primero inicializamos el proyecto con node.js, lo cual genero el archivo package.json
![alt text](image-21.png)

Luego instalamos las dependencias e instalamos nodemon para reiniciar el servidor en cambios automáticamente
![alt text](image-22.png)

Para configurar el servidor con Express, cree un archivo server.js

Luego configure las variables de entorno creando un archivo llamado .env, en donde tengo el usuario y contraseña de mi base de datos.

Este es mi backend hasta el momento
![alt text](image-23.png)
Se agregaron models, routes, el servidor

Luego de que se configuro todo, entre a postman y agregue Categorias, Usuarios y Peliculas

![alt text](image-24.png)
![alt text](image-25.png)
![alt text](image-26.png)


###Integración y Seguridad
Se agregaron unos middleware para auth y verificar el token
![alt text](image-27.png)

Y un generador de token con JWS, tambien en el archivo .env se agrego un SECRET KEY
![alt text](image-28.png)

En el frontend se creo otro archivo .env con la ruta del backend
![alt text](image-29.png)


Se crearon varios archivos en el front para integrar el frontend con el backend
![alt text](image-31.png)
![alt text](image-30.png)

Se crearon dos servicios apiClient y authServices
* ApiClient
![alt text](image-32.png)

* authService
![alt text](image-33.png)

Aqui un ejemplo iniciando sesion
![alt text](image-34.png)


## Desarrollo del Chatbot

Primero nos registramos en OpenAI y generamos una nueva clave para guardarla en el proyecto

Instalamos la biblioteca de OpenAI en el backend del proyecto
![alt text](image-35.png)

Creamos un asistente en Open IA y escribimos las instrucciones de este
![alt text](image-37.png)

Tambien agregamos varias funciones para:
* Buscar la informacion sobre una pelicula
* Buscar las peliculas por género
* Buscar peliculas por precio
![alt text](image-38.png)

Creamos el archivo para manejar OpenAI
![alt text](image-39.png)

Luego creamos un Endpoint en el backend
![alt text](image-40.png)

Asi es como responde desde OpenAI
![alt text](image-41.png)
![alt text](image-42.png)
![alt text](image-43.png)

Asi responde la IA desde la aplicación
![alt text](image-44.png)
![alt text](image-45.png)

