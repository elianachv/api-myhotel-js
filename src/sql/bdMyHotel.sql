-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: bdMyHotel
-- ------------------------------------------------------
-- Server version	8.0.27

CREATE DATABASE `bdMyHotel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cedula` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(60) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula_UNIQUE` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_integrantes` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingresos`
--

DROP TABLE IF EXISTS `ingresos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingresos` (
  `id` bigint NOT NULL,
  `id_grupo` bigint DEFAULT '1',
  `cedula` varchar(45) NOT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `fecha_salida` date DEFAULT NULL,
  `total_consumo` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cedula_idx` (`cedula`),
  KEY `id_grupo_idx` (`id_grupo`),
  CONSTRAINT `cedula` FOREIGN KEY (`cedula`) REFERENCES `clientes` (`cedula`),
  CONSTRAINT `id_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingresos`
--

LOCK TABLES `ingresos` WRITE;
/*!40000 ALTER TABLE `ingresos` DISABLE KEYS */;
/*!40000 ALTER TABLE `ingresos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros`
--

DROP TABLE IF EXISTS `registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registros` (
  `id` bigint NOT NULL,
  `id_ingreso` bigint DEFAULT NULL,
  `cedula` varchar(45) NOT NULL,
  `servicio` varchar(45) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `cedula_idx` (`cedula`),
  KEY `servicio_idx` (`servicio`),
  KEY `registro_id_ingreso_idx` (`id_ingreso`),
  CONSTRAINT `registro_cedula` FOREIGN KEY (`cedula`) REFERENCES `clientes` (`cedula`),
  CONSTRAINT `registro_id_ingreso` FOREIGN KEY (`id_ingreso`) REFERENCES `ingresos` (`id`),
  CONSTRAINT `registro_servicio` FOREIGN KEY (`servicio`) REFERENCES `servicios` (`identificador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros`
--

LOCK TABLES `registros` WRITE;
/*!40000 ALTER TABLE `registros` DISABLE KEYS */;
/*!40000 ALTER TABLE `registros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) NOT NULL,
  `descripcion` varchar(70) DEFAULT NULL,
  `precio` decimal(10,0) NOT NULL,
  `identificador` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identificador_UNIQUE` (`identificador`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Estadia','Estadìa en un dia normal lunes',50000,'ESTADIA_LUNES'),(2,'Estadia','Estadìa en un dia normal martes',50000,'ESTADIA_MARTES'),(3,'Estadia','Estadìa en un dia normal miercoles',50000,'ESTADIA_MIERCOLES'),(4,'Estadia','Estadìa en un dia normal jueves',50000,'ESTADIA_JUEVES'),(5,'Estadia','Estadìa en un dia normal viernes',50000,'ESTADIA_VIERNES'),(6,'Estadia','Estadìa en un dia normal sabado',80000,'ESTADIA_SABADO'),(7,'Estadia','Estadìa en un dia normal domingo',80000,'ESTADIA_DOMINGO'),(8,'Estadia','Estadìa en un dia festivo',80000,'ESTADIA_FESTIVO'),(10,'otro','Plan que incluye todos los servivios del hotel *Sin estadía',90000,'PLAN_TODO_INCLUIDO'),(11,'Bienestar','Ingreso al Spa',10000,'SPA'),(12,'Bienestar','Ingreso al gimnasio',15000,'GYM'),(13,'Restaurante','Cualquier plato del menu del restaurante',30000,'PLATO_RESTAURANTE');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-15  4:55:34
