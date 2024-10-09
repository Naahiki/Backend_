-- Eliminando la tabla si ya existe
DROP TABLE IF EXISTS `users`;

-- Creando la tabla `users`
CREATE TABLE `users` (
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

-- Insertando datos en la tabla `users`
INSERT INTO `users` VALUES 
(1, 'Nahikari Rodriguez', 'nahikirodriguez@gmail.com', 'Nogales', '$2b$10$jRENiTtRlgbvNaUbWFBrb.oW5i1NRWy0Nf.XigGGQm.FttpFFsM7G', 0),
(2, 'Pepe', 'pepe@gmail.com', 'pepe', '$2b$10$0C4Mau9dClVW/6kMuQB7tOEhQb7M9DpMNCXCWrT2YK8Iw8lFRFQDu', 0),
(3, 'hola', 'hola@gmail.com', 'hola', '$2b$10$C.YNV.L9897GRmvjYclqwe/0E/KY1jtIOuolC8amhLn0vcC4g/i.i', 0),
(4, 'nahiki', 'joni@gmail.com', 'nahiki', '$2b$10$2BEnU8uAgEIMUWsHhJhzaO4KEpDnEyqfb3RP4LTDt01LbSaprD7AC', 0),
(5, 'Nahikari Rodriguez', 'fdsfsd@gmail.com', 'Nogales', '$2b$10$UIUwXeD98zxIwsoB.qqz4uB.X6klgdlOVkkV2VIupJ2ZOACmp0eny', 0),
(6, 'Lole', 'luis@gmail.com', 'lole', '$2b$10$sGF20OC0j1cDejBQQQ54QuCG.egipbQznlY7DTbak8xo76wsOmOsC', 0),
(7, 'Botota', 'botota@gmail.com', 'peerez', '$2b$10$WhRiyHTp1FxTdLGpmNam9OGo4uKc5aybCYm7MNNjVfZOcCfNVk8vO', 0),
(8, 'Facu', 'austin@gmail.com', 'boto', '$2b$10$SMyRr51xHrvS6lBO1r8A/uTyyEk1m0wKS/BZvUWSmpnu8Zhi0NXje', 0),
(11, 'Jon', 'joni5@gmail.com', 'Elorriaga', '$2b$10$UwbseFCSFSv7AclVNbM0dePKNhgFFesqkCW.cNXGyjFmlXfaWRyLW', 0),
(13, 'Nahikari Rodriguez', 'nahikirodriguez5@gmail.com', 'Nogales', '$2b$10$wd5JUxb.7YHgA/o920tQWusKntcWPXIGWKN/HD9eBYQett95/wVLu', 0),
(14, 'Nahikari Rodriguez', 'nahikirodriguez54@gmail.com', 'Nogales', '$2b$10$J8UuZOYlVU/lypUfqoS4k.pHWHqr1ZdMpL8ApVVwALrFQhq5Mwf.S', 0);
