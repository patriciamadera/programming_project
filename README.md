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





