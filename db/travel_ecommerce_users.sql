-- Eliminar la tabla `users` si ya existe
DROP TABLE IF EXISTS users;

-- Crear la tabla `users`
CREATE TABLE users (
  id_users INT NOT NULL,
  user_first_name VARCHAR(45) NOT NULL,
  user_email VARCHAR(225) NOT NULL,
  user_last_name VARCHAR(45) NOT NULL,
  user_password VARCHAR(225) NOT NULL,
  user_status TINYINT(1) DEFAULT '0',
  PRIMARY KEY (id_users),
  UNIQUE KEY (user_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
