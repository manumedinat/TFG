-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.19

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

--
-- Table structure for table `appears_sw`
--

DROP TABLE IF EXISTS `appears_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appears_sw` (
  `charid` varchar(255) NOT NULL,
  `episodeid` varchar(255) NOT NULL,
  PRIMARY KEY (`charid`,`episodeid`),
  KEY `FKfeg9xsyj763n8n0akjc6bqhqu` (`episodeid`),
  CONSTRAINT `FKatwrkj58fr5n2lgqkrrcjvx04` FOREIGN KEY (`charid`) REFERENCES `characters_sw` (`id`),
  CONSTRAINT `FKfeg9xsyj763n8n0akjc6bqhqu` FOREIGN KEY (`episodeid`) REFERENCES `episodes_sw` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appears_sw`
--

LOCK TABLES `appears_sw` WRITE;
/*!40000 ALTER TABLE `appears_sw` DISABLE KEYS */;
INSERT INTO `appears_sw` VALUES ('1000','4'),('1001','4'),('1002','4'),('1003','4'),('2000','4'),('2001','4'),('1000','5'),('1001','5'),('1002','5'),('1003','5'),('2000','5'),('2001','5'),('1000','6'),('1001','6'),('1002','6'),('1003','6'),('2000','6'),('2001','6');
/*!40000 ALTER TABLE `appears_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characters_sw`
--

DROP TABLE IF EXISTS `characters_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters_sw` (
  `id` varchar(255) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `typeid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgmfv1f53p6yptiq0kx2govtgv` (`typeid`),
  CONSTRAINT `FKgmfv1f53p6yptiq0kx2govtgv` FOREIGN KEY (`typeid`) REFERENCES `types_sw` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters_sw`
--

LOCK TABLES `characters_sw` WRITE;
/*!40000 ALTER TABLE `characters_sw` DISABLE KEYS */;
INSERT INTO `characters_sw` VALUES ('1000','Luke','Skywalker','H'),('1001','Darth','Vader','H'),('1002','Han','Solo','H'),('1003','Leia','Skywalker','H'),('2000','R2','D2','D'),('2001','C3','PO','D');
/*!40000 ALTER TABLE `characters_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `episodes_sw`
--

DROP TABLE IF EXISTS `episodes_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episodes_sw` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episodes_sw`
--

LOCK TABLES `episodes_sw` WRITE;
/*!40000 ALTER TABLE `episodes_sw` DISABLE KEYS */;
INSERT INTO `episodes_sw` VALUES ('4','NewHope'),('5','Empire'),('6','Jedi');
/*!40000 ALTER TABLE `episodes_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends_sw`
--

DROP TABLE IF EXISTS `friends_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends_sw` (
  `fid` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`fid`,`id`),
  KEY `FKjyxyukp4oxk6o97v2gmkxyeph` (`id`),
  CONSTRAINT `FKjyxyukp4oxk6o97v2gmkxyeph` FOREIGN KEY (`id`) REFERENCES `characters_sw` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends_sw`
--

LOCK TABLES `friends_sw` WRITE;
/*!40000 ALTER TABLE `friends_sw` DISABLE KEYS */;
INSERT INTO `friends_sw` VALUES ('1001','1000'),('1002','1000'),('1003','1000'),('2000','1000'),('2001','1000'),('1000','1001'),('1000','1002'),('1003','1002'),('2001','1002'),('1000','1003'),('1002','1003'),('2000','1003'),('2001','1003'),('1000','2000'),('1002','2000'),('1003','2000'),('2001','2000'),('1000','2001'),('1002','2001'),('1003','2001');
/*!40000 ALTER TABLE `friends_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heroes_sw`
--

DROP TABLE IF EXISTS `heroes_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `heroes_sw` (
  `episodeid` varchar(255) NOT NULL,
  `charid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`episodeid`),
  KEY `FKr1w6hisc6nrkrn1rqrvc0h5sc` (`charid`),
  CONSTRAINT `FKp27a7tbtha6mwwmw51gl5ifcw` FOREIGN KEY (`episodeid`) REFERENCES `episodes_sw` (`id`),
  CONSTRAINT `FKr1w6hisc6nrkrn1rqrvc0h5sc` FOREIGN KEY (`charid`) REFERENCES `characters_sw` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heroes_sw`
--

LOCK TABLES `heroes_sw` WRITE;
/*!40000 ALTER TABLE `heroes_sw` DISABLE KEYS */;
INSERT INTO `heroes_sw` VALUES ('5','1000'),('4','2001'),('6','2001');
/*!40000 ALTER TABLE `heroes_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_sw`
--

DROP TABLE IF EXISTS `types_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types_sw` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_sw`
--

LOCK TABLES `types_sw` WRITE;
/*!40000 ALTER TABLE `types_sw` DISABLE KEYS */;
INSERT INTO `types_sw` VALUES ('D','Droid'),('H','Human');
/*!40000 ALTER TABLE `types_sw` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-28 21:51:23
