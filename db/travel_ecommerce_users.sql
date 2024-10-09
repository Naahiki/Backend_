DROP TABLE IF EXISTS `users`;

-- Crear la tabla `users`
CREATE TABLE users (
  `id_users` int NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(45) NOT NULL,
  `user_email` varchar(225) NOT NULL,
  `user_last_name` varchar(45) NOT NULL,
  `user_password` varchar(225) NOT NULL,
  `user_status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_users`),
  UNIQUE KEY `id_users_UNIQUE` (`id_users`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
