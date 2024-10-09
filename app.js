const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Inicializar dotenv para usar variables de entorno desde el archivo .env
dotenv.config();

// Crear la app de Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware

const corsOptions = {
  origin: ["https://frontend-production-2491.up.railway.app", "http://localhost:3000"], // Permitir tanto local como dominio de producción
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());

// Configurar conexión a la base de datos MySQL
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   decimalNumbers: true,
// });

// // Conectar a MySQL
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//   } else {
//     console.log('Connected to MySQL');
//   }
// });

// Configurar conexión a la base de datos MySQL usando MYSQL_URL
const db = mysql.createConnection(process.env.MYSQL_URL);

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');

  // Solo importar la base de datos si se especifica en las variables de entorno
  if (process.env.RUN_IMPORT === 'true') {
    console.log("Ejecutando la importación de la base de datos...");

    // Definición de las consultas
    const queries = [
      // Consultas para la tabla `users`
      `DROP TABLE IF EXISTS \`users\`;`,
      `CREATE TABLE \`users\` (
        \`id_users\` INT NOT NULL,
        \`user_first_name\` VARCHAR(45) NOT NULL,
        \`user_email\` VARCHAR(225) NOT NULL,
        \`user_last_name\` VARCHAR(45) NOT NULL,
        \`user_password\` VARCHAR(225) NOT NULL,
        \`user_status\` TINYINT(1) DEFAULT '0',
        PRIMARY KEY (\`id_users\`),
        UNIQUE KEY (\`user_email\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

      // Consultas para la tabla `travel_packs`
      `DROP TABLE IF EXISTS \`travel_packs\`;`,
      `CREATE TABLE \`travel_packs\` (
        \`pack_id\` INT NOT NULL,
        \`pack_title\` VARCHAR(225) NOT NULL,
        \`pack_destination\` VARCHAR(225) NOT NULL,
        \`pack_category\` VARCHAR(45) NOT NULL,
        \`pack_price\` DECIMAL(10,2) NOT NULL,
        \`pack_date\` VARCHAR(225) NOT NULL,
        \`pack_image\` VARCHAR(225) NOT NULL,
        \`pack_amount\` INT NOT NULL,
        PRIMARY KEY (\`pack_id\`),
        UNIQUE KEY (\`pack_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

      // Insertar datos en la tabla `travel_packs`
      `INSERT INTO \`travel_packs\` (\`pack_id\`, \`pack_title\`, \`pack_destination\`, \`pack_category\`, \`pack_price\`, \`pack_date\`, \`pack_image\`, \`pack_amount\`) VALUES 
      (1, 'Aventura en los Alpes', 'Suiza', 'Aventura', 1500.00, 'Julio', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1727947904/Alpes_e4jby3.jpg', 10),
      (2, 'Aventura en Turquía con Globos Aerostáticos', 'Turquía', 'Aventura', 1800.00, 'Agosto', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1727947037/samples/balloons.jpg', 5),
      (3, 'Naturaleza Exuberante', 'Montañas', 'Relax', 1200.00, 'Septiembre', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/landscapes/nature-mountains.jpg', 8),
      (4, 'Escapada de Playa', 'Islas Maldivas', 'Familiar', 2200.00, 'Diciembre', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/landscapes/beach-boat.jpg', 2),
      (5, 'Aventura en la Montaña Mágica', 'Andes', 'Aventura', 1300.00, 'Octubre', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1727947039/cld-sample-2.jpg', 6),
      (6, 'Tour Gastronómico por Italia', 'Italia', 'Gastronomía', 2000.00, 'Noviembre', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1727947040/cld-sample-4.jpg', 4),
      (7, 'Descubre el Oriente Místico', 'Japón', 'Cultural', 2500.00, 'Marzo', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/food/spices.jpg', 7),
      (8, 'Explorando Nueva York', 'Nueva York', 'Cultural', 3000.00, 'Abril', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/landscapes/architecture-signs.jpg', 0),
      (9, 'Escapada Rural a la Campiña Inglesa', 'Inglaterra', 'Rural', 1100.00, 'Junio', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1727947030/samples/sheep.jpg', 9),
      (10, 'Romántico París', 'Francia', 'Cultural', 600.00, 'Mayo', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728246145/Paris_nt1qjw.jpg', 12),
      (11, 'Exploración de Ámsterdam en Bicicleta', 'Países Bajos', 'Aventura', 450.00, 'Junio', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728246202/amster_w6dowu.jpg', 9),
      (12, 'Tradiciones de Japón', 'Japón', 'Cultural', 900.00, 'Octubre', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728246235/japon_gj2td8.jpg', 6),
      (13, 'Café y Cultura en Colombia', 'Colombia', 'Cultural', 750.00, 'Noviembre', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728246234/colombia_ulhwhk.jpg', 5),
      (14, 'Paraíso Cubano en Varadero', 'Cuba', 'Relax', 500.00, 'Agosto', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728246270/cua_hk2egi.jpg', 7),
      (15, 'Aventura en Euskal Herria', 'Euskal Herria', 'Aventura', 650.00, 'Julio', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728284543/euskadi_ttqcxr.jpg', 8),
      (16, 'Vibrante Barcelona', 'España', 'Cultural', 550.00, 'Septiembre', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728284543/bcn_c3ckal.png', 10),
      (17, 'Relax en las Playas de Miami', 'Estados Unidos', 'Relax', 800.00, 'Diciembre', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728284632/MIAMI_ydqlgy.jpg', 6),
      (18, 'Escapada Escocesa', 'Reino Unido', 'Cultural', 700.00, 'Abril', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728284714/escocia_gub4t0.jpg', 0),
      (19, 'Rutas Verdes de Irlanda', 'Irlanda', 'Aventura', 750.00, 'Marzo', 'https://res.cloudinary.com/diej1zlz4/image/upload/v1728284714/irlanda_gd6xsp.jpg', 5);`,

      // Eliminar la tabla `orders` si ya existe
      `DROP TABLE IF EXISTS \`orders\`;`,
      
      // Crear la tabla `orders`
      `CREATE TABLE \`orders\` (
        \`order_id\` INT NOT NULL AUTO_INCREMENT,
        \`id_users\` INT DEFAULT NULL,
        \`address\` VARCHAR(255) DEFAULT NULL,
        \`city\` VARCHAR(100) DEFAULT NULL,
        \`postal_code\` VARCHAR(10) DEFAULT NULL,
        \`payment_method\` VARCHAR(50) NOT NULL,
        \`status\` TINYINT(1) DEFAULT NULL,
        \`order_date\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`order_id\`),
        KEY (\`id_users\`),
        CONSTRAINT \`orders_ibfk_1\` FOREIGN KEY (\`id_users\`) REFERENCES \`users\` (\`id_users\`)
      ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

      // Eliminar la tabla `order_items` si ya existe
      `DROP TABLE IF EXISTS \`order_items\`;`,
      
      // Crear la tabla `order_items`
      `CREATE TABLE \`order_items\` (
        \`order_item_id\` INT NOT NULL AUTO_INCREMENT,
        \`order_id\` INT DEFAULT NULL,
        \`pack_id\` INT DEFAULT NULL,
        \`quantity\` INT DEFAULT NULL,
        PRIMARY KEY (\`order_item_id\`),
        KEY (\`order_id\`),
        KEY (\`pack_id\`),
        CONSTRAINT \`order_items_ibfk_1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\` (\`order_id\`) ON DELETE CASCADE,
        CONSTRAINT \`order_items_ibfk_2\` FOREIGN KEY (\`pack_id\`) REFERENCES \`travel_packs\` (\`pack_id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`
    ];

    // Función para ejecutar las consultas secuencialmente
    const executeQueries = (queries) => {
      queries.forEach((query) => {
        db.query(query, (err, result) => {
          if (err) {
            console.error('Error ejecutando la consulta:', err);
            return;
          }
          console.log('Consulta ejecutada con éxito:', query);
        });
      });
    };

    // Ejecutar las consultas
    executeQueries(queries);
  }
});


// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

// ENDPOINTS 

// Ruta para registrar un usuario

app.post('/api/register', async (req, res) => {
  const { user_email, user_password, user_first_name, user_last_name } = req.body;

  try {
    // Verificar si el email ya existe
    const checkEmailQuery = 'SELECT * FROM users WHERE user_email = ?';
    db.query(checkEmailQuery, [user_email], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'El email ya está registrado' }); // Responder con un error específico
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(user_password, 10);

      // Inserción en la base de datos
      const insertUserQuery = `INSERT INTO users (user_email, user_password, user_first_name, user_last_name, user_status) 
                               VALUES (?, ?, ?, ?, 0)`;
      db.query(insertUserQuery, [user_email, hashedPassword, user_first_name, user_last_name], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error al registrar usuario' });
        }

        // Obtenemos el ID del usuario recién creado
        const userId = result.insertId;

        // Devolvemos los detalles del usuario registrado
        res.status(200).json({
          user_id: userId,  // Enviar el ID del usuario
          firstName: user_first_name,
          lastName: user_last_name,
          email: user_email,
          status: 0 // Estado inicial del usuario
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


//  obtener paquetes de viaje desde la base de datos y mostrarlos en el frontend.
app.get('/api/travel-packs', (req, res) => {
  const query = 'SELECT * FROM travel_packs';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los paquetes de viaje' });
    }
    res.status(200).json(results);
  });
});

// Ruta para el login del usuario
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Consultar el usuario en la base de datos por email
  const query = 'SELECT * FROM users WHERE user_email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    // Si no se encuentra el usuario
    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.user_password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si el login es exitoso, devuelve los datos del usuario
    res.status(200).json({
      success: true,
      user: {
        id: user.id_users, // Cambiado a 'id_user' para coincidir con la base de datos
        email: user.user_email,
        firstName: user.user_first_name,
        lastName: user.user_last_name,
        status: user.user_status,
      },
    });
  });
});

// Ruta para crear un pedido
app.post('/api/create-order', (req, res) => {
  const { user_id, shippingAddress, postalCode, city, paymentMethod, cartItems } = req.body;

  
  const orderQuery = `INSERT INTO orders (id_users, address, city, postal_code, payment_method, status) 
                      VALUES (?, ?, ?, ?, ?, 0)`;

  db.query(orderQuery, [user_id, shippingAddress, city, postalCode, paymentMethod], (err, result) => {
    if (err) {
      console.error('Error al crear el pedido:', err);
      return res.status(500).json({ error: 'Error al crear el pedido' });
    }

    const orderId = result.insertId; 

    
    const orderItemsQuery = `INSERT INTO order_items (order_id, pack_id, quantity) VALUES ?`;
    
    
    const orderItemsData = cartItems.map(item => [orderId, item.pack_id, item.quantity]);  

    db.query(orderItemsQuery, [orderItemsData], (err) => {
      if (err) {
        console.error('Error al insertar los packs en el pedido:', err);
        return res.status(500).json({ error: 'Error al insertar los packs en el pedido' });
      }

      res.status(200).json({ message: 'Pedido procesado exitosamente', orderId });
    });
  });
});


// Endpoint para obtener los pedidos del usuario autenticado
app.get('/api/orders/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT o.order_id, o.order_date, o.status, o.address, o.city, o.postal_code, 
           oi.order_item_id, tp.pack_title, tp.pack_price, oi.quantity
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN travel_packs tp ON oi.pack_id = tp.pack_id
    WHERE o.id_users = ?
    ORDER BY o.order_date DESC, oi.order_item_id;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error en la consulta SQL:", err);
      return res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
    res.status(200).json(results);
  });
});



// Endpoint para actualizar la dirección de un pedido si el estado es pendiente
app.patch('/api/orders/:orderId/update-address', (req, res) => {
  const orderId = req.params.orderId;
  const { address, postalCode, city } = req.body;

  // Primero, verificar si el estado del pedido es pendiente
  const getStatusQuery = 'SELECT status FROM orders WHERE order_id = ?';
  db.query(getStatusQuery, [orderId], (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    const orderStatus = results[0]?.status;

    if (orderStatus !== 0) { 
      return res.status(400).json({ error: 'No se puede modificar la dirección de un pedido procesado' });
    }

    // Si el pedido está pendiente, proceder con la actualización
    const updateQuery = `
      UPDATE orders 
      SET address = ?, postal_code = ?, city = ?
      WHERE order_id = ?
    `;
    db.query(updateQuery, [address, postalCode, city, orderId], (err) => {
      if (err) {
        console.error('Error al actualizar la dirección:', err);
        return res.status(500).json({ error: 'Error al actualizar la dirección' });
      }

      res.status(200).json({ message: 'Dirección actualizada exitosamente' });
    });
  });
});

// Endpoint para eliminar un pedido por su ID
app.delete('/api/delete-orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;

  // Eliminar primero los items relacionados con el pedido en 'order_items'
  const deleteOrderItemsQuery = 'DELETE FROM order_items WHERE order_id = ?';
  
  db.query(deleteOrderItemsQuery, [orderId], (err) => {
    if (err) {
      console.error('Error al eliminar los items del pedido:', err);
      return res.status(500).json({ error: 'Error al eliminar los items del pedido' });
    }

    // Luego eliminar el pedido en la tabla 'orders'
    const deleteOrderQuery = 'DELETE FROM orders WHERE order_id = ?';

    db.query(deleteOrderQuery, [orderId], (err) => {
      if (err) {
        console.error('Error al eliminar el pedido:', err);
        return res.status(500).json({ error: 'Error al eliminar el pedido' });
      }

      res.status(200).json({ message: 'Pedido eliminado exitosamente' });
    });
  });
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
