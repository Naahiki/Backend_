const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inicializar dotenv para usar variables de entorno desde el archivo .env
dotenv.config();

// Crear la app de Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware

const corsOptions = {
  origin: ["https://puertos-dev-3000.datavaluemanagement.sarenet.es", "http://localhost:3000"], // Permitir tanto local como dominio de producción
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
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
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
