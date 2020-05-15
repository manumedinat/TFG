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
  KEY `FKpnll5ygw587rw7uorhis2ufu3` (`episodeid`),
  CONSTRAINT `FK9lne3dfaqwu34htdscipljful` FOREIGN KEY (`charid`) REFERENCES `character_sw` (`id`),
  CONSTRAINT `FKpnll5ygw587rw7uorhis2ufu3` FOREIGN KEY (`episodeid`) REFERENCES `episode_sw` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appears_sw`
--

LOCK TABLES `appears_sw` WRITE;
/*!40000 ALTER TABLE `appears_sw` DISABLE KEYS */;
INSERT INTO `appears_sw` VALUES ('1000','4'),('1001','4'),('1002','4'),('2000','4'),('2001','4'),('1000','5'),('1001','5'),('1002','5'),('1003','5'),('2000','5'),('2001','5'),('1000','6'),('1001','6'),('1002','6'),('1003','6'),('2001','6');
/*!40000 ALTER TABLE `appears_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_sw`
--

DROP TABLE IF EXISTS `character_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character_sw` (
  `id` varchar(255) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `typeid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsi0tn1scybgwev1cnv8wowa9q` (`typeid`),
  CONSTRAINT `FKsi0tn1scybgwev1cnv8wowa9q` FOREIGN KEY (`typeid`) REFERENCES `character_type_sw` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_sw`
--

LOCK TABLES `character_sw` WRITE;
/*!40000 ALTER TABLE `character_sw` DISABLE KEYS */;
INSERT INTO `character_sw` VALUES ('1000','Luke','Skywalker','H'),('1001','Darth','Vader','H'),('1002','Han','Solo','H'),('1003','Leia','Skywalker','H'),('2000','R2','D2','D'),('2001','C3','PO','D');
/*!40000 ALTER TABLE `character_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_type_sw`
--

DROP TABLE IF EXISTS `character_type_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character_type_sw` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_type_sw`
--

LOCK TABLES `character_type_sw` WRITE;
/*!40000 ALTER TABLE `character_type_sw` DISABLE KEYS */;
INSERT INTO `character_type_sw` VALUES ('D','Droid'),('H','Human');
/*!40000 ALTER TABLE `character_type_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `episode_sw`
--

DROP TABLE IF EXISTS `episode_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episode_sw` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episode_sw`
--

LOCK TABLES `episode_sw` WRITE;
/*!40000 ALTER TABLE `episode_sw` DISABLE KEYS */;
INSERT INTO `episode_sw` VALUES ('4','NewHope'),('5','Empire'),('6','Jedi');
/*!40000 ALTER TABLE `episode_sw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendship_sw`
--

DROP TABLE IF EXISTS `friendship_sw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship_sw` (
  `fid` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`fid`,`id`),
  KEY `FK7cglxx1dr47g899ywtxpull59` (`id`),
  CONSTRAINT `FK7cglxx1dr47g899ywtxpull59` FOREIGN KEY (`id`) REFERENCES `character_sw` (`id`),
  CONSTRAINT `FKsput227q5l9t61yw7s52m5xbh` FOREIGN KEY (`fid`) REFERENCES `character_sw` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship_sw`
--

LOCK TABLES `friendship_sw` WRITE;
/*!40000 ALTER TABLE `friendship_sw` DISABLE KEYS */;
INSERT INTO `friendship_sw` VALUES ('1001','1000'),('1002','1000'),('1003','1000'),('1000','1001'),('1000','1002'),('2000','1002'),('1000','1003'),('2000','1003'),('1002','2000'),('1003','2000'),('2001','2000'),('2000','2001');
/*!40000 ALTER TABLE `friendship_sw` ENABLE KEYS */;
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
  KEY `FK77owm02fdsqvumb8fdnf18h7p` (`charid`),
  CONSTRAINT `FK77owm02fdsqvumb8fdnf18h7p` FOREIGN KEY (`charid`) REFERENCES `character_sw` (`id`),
  CONSTRAINT `FKivirqd0lpjt7npy1sseq7bptv` FOREIGN KEY (`episodeid`) REFERENCES `episode_sw` (`id`)
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-15 13:48:23
