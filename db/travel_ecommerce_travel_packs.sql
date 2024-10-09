-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
-- 
-- Host: 127.0.0.1    Database: travel_ecommerce
-- ------------------------------------------------------
-- Server version	9.0.1

-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!50503 SET NAMES utf8 */;
-- /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
-- /*!40103 SET TIME_ZONE='+00:00' */;
-- /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
-- /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
-- /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `travel_packs`
--

DROP TABLE IF EXISTS `travel_packs`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_packs` (
  `pack_id` int NOT NULL,
  `pack_title` varchar(225) NOT NULL,
  `pack_destination` varchar(225) NOT NULL,
  `pack_category` varchar(45) NOT NULL,
  `pack_price` decimal(10,2) NOT NULL,
  `pack_date` varchar(225) NOT NULL,
  `pack_image` varchar(225) NOT NULL,
  `pack_amount` int NOT NULL,
  PRIMARY KEY (`pack_id`),
  UNIQUE KEY `pack_id_UNIQUE` (`pack_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_packs`
--

LOCK TABLES `travel_packs` WRITE;
-- /*!40000 ALTER TABLE `travel_packs` DISABLE KEYS */;
INSERT INTO `travel_packs` VALUES (1,'Aventura en los Alpes','Suiza','Aventura',1500.00,'Julio','https://res.cloudinary.com/diej1zlz4/image/upload/v1727947904/Alpes_e4jby3.jpg',10),(2,'Aventura en Turquía con Globos Aerostáticos','Turquía','Aventura',1800.00,'Agosto','https://res.cloudinary.com/diej1zlz4/image/upload/v1727947037/samples/balloons.jpg',5),(3,'Naturaleza Exuberante','Montañas','Relax',1200.00,'Septiembre','https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/landscapes/nature-mountains.jpg',8),(4,'Escapada de Playa','Islas Maldivas','Familiar',2200.00,'Diciembre','https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/landscapes/beach-boat.jpg',2),(5,'Aventura en la Montaña Mágica','Andes','Aventura',1300.00,'Octubre','https://res.cloudinary.com/diej1zlz4/image/upload/v1727947039/cld-sample-2.jpg',6),(6,'Tour Gastronómico por Italia','Italia','Gastronomía',2000.00,'Noviembre','https://res.cloudinary.com/diej1zlz4/image/upload/v1727947040/cld-sample-4.jpg',4),(7,'Descubre el Oriente Místico','Japón','Cultural',2500.00,'Marzo','https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/food/spices.jpg',7),(8,'Explorando Nueva York','Nueva York','Cultural',3000.00,'Abril','https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/landscapes/architecture-signs.jpg',0),(9,'Escapada Rural a la Campiña Inglesa','Inglaterra','Rural',1100.00,'Junio','https://res.cloudinary.com/diej1zlz4/image/upload/v1727947030/samples/sheep.jpg',9),(10,'Romántico París','Francia','Cultural',600.00,'Mayo','https://res.cloudinary.com/diej1zlz4/image/upload/v1728246145/Paris_nt1qjw.jpg',12),(11,'Exploración de Ámsterdam en Bicicleta','Países Bajos','Aventura',450.00,'Junio','https://res.cloudinary.com/diej1zlz4/image/upload/v1728246202/amster_w6dowu.jpg',9),(12,'Tradiciones de Japón','Japón','Cultural',900.00,'Octubre','https://res.cloudinary.com/diej1zlz4/image/upload/v1728246235/japon_gj2td8.jpg',6),(13,'Café y Cultura en Colombia','Colombia','Cultural',750.00,'Noviembre','https://res.cloudinary.com/diej1zlz4/image/upload/v1728246234/colombia_ulhwhk.jpg',5),(14,'Paraíso Cubano en Varadero','Cuba','Relax',500.00,'Agosto','https://res.cloudinary.com/diej1zlz4/image/upload/v1728246270/cua_hk2egi.jpg',7),(15,'Aventura en Euskal Herria','Euskal Herria','Aventura',650.00,'Julio','https://res.cloudinary.com/diej1zlz4/image/upload/v1728284543/euskadi_ttqcxr.jpg',8),(16,'Vibrante Barcelona','España','Cultural',550.00,'Septiembre','https://res.cloudinary.com/diej1zlz4/image/upload/v1728284543/bcn_c3ckal.png',10),(17,'Relax en las Playas de Miami','Estados Unidos','Relax',800.00,'Diciembre','https://res.cloudinary.com/diej1zlz4/image/upload/v1728284632/MIAMI_ydqlgy.jpg',6),(18,'Escapada Escocesa','Reino Unido','Cultural',700.00,'Abril','https://res.cloudinary.com/diej1zlz4/image/upload/v1728284714/escocia_gub4t0.jpg',0),(19,'Rutas Verdes de Irlanda','Irlanda','Aventura',750.00,'Marzo','https://res.cloudinary.com/diej1zlz4/image/upload/v1728284714/irlanda_gd6xsp.jpg',5);
-- /*!40000 ALTER TABLE `travel_packs` ENABLE KEYS */;
UNLOCK TABLES;
-- /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

-- /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
-- /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
-- /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-08 20:33:45
