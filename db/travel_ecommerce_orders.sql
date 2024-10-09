-- Eliminar la tabla `orders` si ya existe
DROP TABLE IF EXISTS orders;

-- Crear la tabla `orders`
CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT,
  id_users INT DEFAULT NULL,
  address VARCHAR(255) DEFAULT NULL,
  city VARCHAR(100) DEFAULT NULL,
  postal_code VARCHAR(10) DEFAULT NULL,
  payment_method VARCHAR(50) NOT NULL,
  status TINYINT(1) DEFAULT NULL,
  order_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (order_id),
  KEY id_users (id_users),
  CONSTRAINT orders_ibfk_1 FOREIGN KEY (id_users) REFERENCES users (id_users)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

