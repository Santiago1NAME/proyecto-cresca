-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: cresca_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `core_logs`
--

DROP TABLE IF EXISTS `core_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_logs` (
  `action` varchar(255) NOT NULL,
  `modulo` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `id` varchar(36) NOT NULL,
  `idUser` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `core_roles`
--

DROP TABLE IF EXISTS `core_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_roles` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `modulo` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_roles`
--

LOCK TABLES `core_roles` WRITE;
/*!40000 ALTER TABLE `core_roles` DISABLE KEYS */;
INSERT INTO `core_roles` VALUES ('927aa6cd-5ec2-11f1-b6a6-00155dba52c5','users','users_create'),('927b3c8d-5ec2-11f1-b6a6-00155dba52c5','users','users_view'),('927bb231-5ec2-11f1-b6a6-00155dba52c5','users','user_edit'),('927c1219-5ec2-11f1-b6a6-00155dba52c5','admin','admin_create'),('927c78cc-5ec2-11f1-b6a6-00155dba52c5','admin','admin_view'),('927cd075-5ec2-11f1-b6a6-00155dba52c5','admin','admin_edit');
/*!40000 ALTER TABLE `core_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_lst`
--

DROP TABLE IF EXISTS `users_lst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_lst` (
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tipoDocumento` varchar(255) NOT NULL,
  `cedula` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ff89caeb4f8b97419e5815a28e` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_lst`
--

LOCK TABLES `users_lst` WRITE;
/*!40000 ALTER TABLE `users_lst` DISABLE KEYS */;
INSERT INTO `users_lst` VALUES ('edwin uribe santiago uribe','esanti1020@gmail.com','CC','12321432','$2b$10$PcvlTnWdgddxfxIhT1L68Obs/23yB/1H98vlw.LJuU1LuQAsr9yjy','d6d810de-657f-4d58-8ec3-f67542e12246'),('edwin1','esanti10@gmail.com','CC','12321432','$2b$10$GY40DQ/jW7k4NoKewGcppuU/7/zfMsD57ANLxQaiUxoiokwgB8IxO','e2849e9b-0828-4dd4-9ee0-88022b8d3738'),('edwin1','esanti1022244423@gmail.com','CC','12321432','$2b$10$5/Dr2qFoPDfm2rA6R4FlI.ChslZ8TvZ2iQ0wIWC0cbhtZt/xBDuH.','ec0683e9-3f48-4b27-b587-282bcd5e872d');
/*!40000 ALTER TABLE `users_lst` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `id` varchar(36) NOT NULL,
  `idUser` varchar(36) NOT NULL,
  `idRol` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3c62893ad008d85511e91a18ae0` (`idUser`),
  KEY `FK_780eb77e834d15f543f86fc2b6d` (`idRol`),
  CONSTRAINT `FK_3c62893ad008d85511e91a18ae0` FOREIGN KEY (`idUser`) REFERENCES `users_lst` (`id`),
  CONSTRAINT `FK_780eb77e834d15f543f86fc2b6d` FOREIGN KEY (`idRol`) REFERENCES `core_roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES ('22b6f790-2eb9-436f-9826-06f8c08672a4','e2849e9b-0828-4dd4-9ee0-88022b8d3738','927aa6cd-5ec2-11f1-b6a6-00155dba52c5'),('28b1b0a4-81f1-431f-bd30-27337a5eb2e6','d6d810de-657f-4d58-8ec3-f67542e12246','927b3c8d-5ec2-11f1-b6a6-00155dba52c5'),('3ed29568-46f1-4155-aa35-47a6f37acd5c','d6d810de-657f-4d58-8ec3-f67542e12246','927aa6cd-5ec2-11f1-b6a6-00155dba52c5'),('93a144fc-a6f4-4102-b26f-6c14a628dbc9','d6d810de-657f-4d58-8ec3-f67542e12246','927c78cc-5ec2-11f1-b6a6-00155dba52c5'),('bfc3a67f-944c-4042-9c86-d344fa67c05d','d6d810de-657f-4d58-8ec3-f67542e12246','927cd075-5ec2-11f1-b6a6-00155dba52c5'),('fbe64456-805a-48de-9892-d3a6104c76c7','d6d810de-657f-4d58-8ec3-f67542e12246','927bb231-5ec2-11f1-b6a6-00155dba52c5'),('fd58dbc7-b41d-4fac-b686-d60f2b9ef6a7','d6d810de-657f-4d58-8ec3-f67542e12246','927c1219-5ec2-11f1-b6a6-00155dba52c5');
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-30 13:19:35
