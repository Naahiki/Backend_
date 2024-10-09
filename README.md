
# EasyTravel Backend

Este repositorio contiene el backend de la aplicación **EasyTravel**, un ecommerce de paquetes de viaje que permite a los usuarios buscar y comprar viajes personalizados, además de gestionar su carrito y ver su historial de pedidos.

## Descripción

El backend de **EasyTravel** está construido usando **Node.js** y **Express.js**. Maneja la lógica de negocio, la autenticación de usuarios, las operaciones del carrito de compras, y la gestión de pedidos, así como la conexión con una base de datos **MySQL**.

## Tecnologías Utilizadas

- **Node.js**: Para el entorno del servidor.
- **Express.js**: Framework para la creación de APIs REST.
- **MySQL**: Base de datos relacional para almacenar usuarios, pedidos y paquetes de viaje.
- **bcrypt**: Para encriptar contraseñas de usuarios.
- **dotenv**: Para la gestión de variables de entorno.
- **Railway**: Para el despliegue del servidor y la base de datos.


### Endpoints del Backend de EasyTravel

1. **Registro de Usuario**:
   - **Ruta**: `/api/register`
   - **Método**: POST
   - **Descripción**: Permite registrar un nuevo usuario en la base de datos.
   - **Parámetros**: `user_email`, `user_password`, `user_first_name`, `user_last_name`
   - **Respuesta**: Devuelve el ID del usuario recién creado y los datos de registro.

2. **Inicio de Sesión**:
   - **Ruta**: `/api/login`
   - **Método**: POST
   - **Descripción**: Verifica las credenciales del usuario y permite el inicio de sesión.
   - **Parámetros**: `email`, `password`
   - **Respuesta**: Devuelve los datos del usuario autenticado si el inicio de sesión es exitoso.

3. **Obtener Paquetes de Viaje**:
   - **Ruta**: `/api/travel-packs`
   - **Método**: GET
   - **Descripción**: Devuelve todos los paquetes de viaje disponibles en la base de datos.
   - **Respuesta**: Lista de paquetes de viaje.

4. **Crear Pedido**:
   - **Ruta**: `/api/create-order`
   - **Método**: POST
   - **Descripción**: Crea un nuevo pedido con los items en el carrito del usuario.
   - **Parámetros**: `user_id`, `shippingAddress`, `postalCode`, `city`, `paymentMethod`, `cartItems`
   - **Respuesta**: Devuelve el ID del pedido recién creado.

5. **Obtener Pedidos del Usuario**:
   - **Ruta**: `/api/orders/:userId`
   - **Método**: GET
   - **Descripción**: Devuelve el historial de pedidos de un usuario específico.
   - **Parámetros**: `userId` (ID del usuario)
   - **Respuesta**: Lista de pedidos y detalles de los productos asociados.

6. **Actualizar Dirección del Pedido**:
   - **Ruta**: `/api/orders/:orderId/update-address`
   - **Método**: PATCH
   - **Descripción**: Permite al usuario cambiar la dirección de envío de un pedido si el pedido no ha sido procesado aún.
   - **Parámetros**: `orderId` (ID del pedido), `address`, `postalCode`, `city`
   - **Respuesta**: Mensaje de éxito si la actualización es exitosa.

7. **Eliminar Pedido**:
   - **Ruta**: `/api/delete-orders/:orderId`
   - **Método**: DELETE
   - **Descripción**: Elimina un pedido por su ID. También elimina los items relacionados con el pedido.
   - **Parámetros**: `orderId` (ID del pedido)
   - **Respuesta**: Mensaje de éxito si el pedido es eliminado correctamente.


## Conexión con la Base de Datos

El backend está conectado a una base de datos MySQL. Debes configurar las credenciales de conexión en el archivo `.env` antes de ejecutar la aplicación.

### Ejemplo de archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=easytravel
```

## Instalación y Configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Naahiki/Backend_.git
   cd Backend_
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` con las credenciales de MySQL.

4. Crea y configura la base de datos. Puedes ejecutar los scripts SQL proporcionados en el repositorio para crear las tablas y pre-cargar los datos necesarios.

5. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

   El servidor debería ejecutarse en [http://localhost:3000](http://localhost:3000).

## Despliegue


## Consideraciones

- Este backend está diseñado para ser usado junto con el [repositorio frontend](https://github.com/Naahiki/Frontend_) de EasyTravel.
- Es necesario tener acceso a una base de datos MySQL en funcionamiento.
  