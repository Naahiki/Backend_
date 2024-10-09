-- Eliminar la tabla `orders` si ya existe
DROP TABLE IF EXISTS `orders`;

-- Crear la tabla `orders`
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `id_users` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `id_users` (`id_users`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


