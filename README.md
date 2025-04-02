# Plataforma de E-commerce

Caso de Estudio: Desarrollo de una plataforma web e-commerce y despliegue en Amazon Web Service (AWS).
Este proyecto es una plataforma de Ecommerce enfocada en la compra y administración de películas y series. Permite a los usuarios explorar diferentes títulos, ver detalles de cada película y realizar compras. Además, los administradores pueden editar información de los productos. Este proyecto está construido de la siguiente manera:
    HTML, Tailwind CSS, Vite + React con Javascript para el frontend.
    Express, Node.js, JWT para el backend.
    MongoDB y PostgreSQL para las base de datos.


## Tabla de Contenidos

- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologias-utilizadas)
- [Descripción del Proyecto](#descripcion-del-proyecto)
- [Integración y Seguridad](#integracion-y-seguridad)
- [Chatbot](#chatbot)
- [Despliegue en AWS](#despliegue-en-aws)


## Instalación
1. **Clonar el Repositorio**:
   git clone https://github.com/patriciamadera/programming_project.git
   programming_project

2. **Instalar dependencias**:
    * Para el backend:
    cd BACKEND
    npm install

    * Para el frontend:
    cd FRONTEND
    cd ecommerce-frontend
    npm install

3. **Ejecución del sistema**:
    * Para el backend:
    npm run dev

    * Para el frontend:
    npm run dev


## Estructura del Proyecto
![alt text](image-54.png)  


## Tecnologías Utilizadas
- Frontend:
    * React
    * Redux (o Context API)
    * React Router
    * Axios
    * TailwindCSS
- Backend:
    * Node.js
    * Express.js
    * MongoDB
    * PostgreSQL
    * Mongoose
    * JWT (JSON Web Tokens)
- Otros:
    * Git
    * npm 


## Descripción del Proyecto
MovieEcommerce es una aplicación web completa que permite a los usuarios comprar películas en línea y a los administradores les permite Crear, Editar, Eliminar las películas. 
El proyecto incluye un frontend desarrollado con React con Javascript y un backend desarrollado con Node.js y Express.js. 
La base de datos utilizada es MongoDB.

![alt text](image-8.png)
Esta es la página de inicio, cuenta con un login, un botón para registrarse y si se le olvida la contraseña.

![alt text](image-9.png)
![alt text](image-14.png)
Aqui se muestra un ejemplo de la validación del login

![alt text](image-12.png)
Validacion en el correo

![alt text](image-55.png)
Se muestra el formulario de Registro.

![alt text](image-56.png)
Y las validaciones en el mismo formulario


![alt text](image-6.png)
Parte del home de la aplicación

![alt text](image-1.png)
Menú del usuario, donde se ve la Cuenta, Configuración y Cerrar Sesión.

![alt text](image-57.png)
Navbar con todas las rutas de la aplicación.

![alt text](image-58.png)
Grid con todas las películas visibles para los usuarios/clientes.

![alt text](image-59.png)
Detalle de las películas, en donde sale la portada, descripció, precio, botón para comprar, entre otros.

![alt text](image-63.png)
Modal para Comprar una película en la cual sale el nombre de la película y el precio.

![alt text](image-60.png)
Dashboard para los administradores, en donde se muestra el listado de todas las peliculas que se han creado.

![alt text](image-61.png)
Página para agregar las películas

![alt text](image-62.png)
Página para editar una película ya agregada, aqui un ejemplo de una de las películas que cree.



## Integración y Seguridad
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


## Chatbot

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

## Despliegue a AWS
Se crea una instancia EC2 en AWS y se configura 
![alt text](image-46.png)
![alt text](image-50.png)

Se configuraron los puertos
![alt text](image-49.png)

Abrimos la terminal e instalamos las dependencias que se necesitan para poder correr el proyecto, como MongoDB y PostgreSQL
![alt text](image-47.png)

Aqui corrimos el frontend
![alt text](image-48.png)

Reiniciando el servidor en el backend
![alt text](image-52.png)

Aqui ya el servidor funcionando
![alt text](image-51.png)

Ya aqui mi aplicacion esta funcionando con mi IP
![alt text](image-53.png)


