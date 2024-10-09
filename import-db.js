const fs = require('fs');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT, // Usar el puerto proporcionado por Railway
    decimalNumbers: true,
  });

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');

  // Leer y ejecutar archivos SQL
  const sqlFiles = [
    './db/travel_ecommerce_users.sql',
    './db/travel_ecommerce_orders.sql',
    './db/travel_ecommerce_order_items.sql',
    './db/travel_ecommerce_travel_packs.sql'
  ];

  sqlFiles.forEach((file) => {
    const sql = fs.readFileSync(file).toString();
    db.query(sql, (err, result) => {
      if (err) {
        console.error(`Error ejecutando el archivo ${file}:`, err);
        return;
      }
      console.log(`Ejecutado el archivo ${file} correctamente`);
    });
  });

  // Cerrar la conexión
  db.end();
});
