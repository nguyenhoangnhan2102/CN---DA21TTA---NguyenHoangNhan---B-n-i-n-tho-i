-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: shopphone
-- ------------------------------------------------------
-- Server version	5.7.40

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
-- Table structure for table `CHITIETDONHANG`
--

DROP TABLE IF EXISTS `CHITIETDONHANG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CHITIETDONHANG` (
  `madonhang` int(11) NOT NULL,
  `masanpham` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `giatien` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`madonhang`,`masanpham`,`mamau`),
  KEY `masanpham` (`masanpham`),
  KEY `mamau` (`mamau`),
  CONSTRAINT `CHITIETDONHANG_ibfk_1` FOREIGN KEY (`madonhang`) REFERENCES `DONHANG` (`madonhang`),
  CONSTRAINT `CHITIETDONHANG_ibfk_2` FOREIGN KEY (`masanpham`) REFERENCES `SANPHAM` (`masanpham`),
  CONSTRAINT `CHITIETDONHANG_ibfk_3` FOREIGN KEY (`mamau`) REFERENCES `MAUSACSANPHAM` (`mamau`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CHITIETDONHANG`
--

LOCK TABLES `CHITIETDONHANG` WRITE;
/*!40000 ALTER TABLE `CHITIETDONHANG` DISABLE KEYS */;
/*!40000 ALTER TABLE `CHITIETDONHANG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CHITIETGIOHANG`
--

DROP TABLE IF EXISTS `CHITIETGIOHANG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CHITIETGIOHANG` (
  `magiohang` int(11) NOT NULL,
  `masanpham` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `soluong` int(11) DEFAULT NULL,
  `gia` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`magiohang`,`masanpham`,`mamau`),
  KEY `masanpham` (`masanpham`),
  KEY `mamau` (`mamau`),
  CONSTRAINT `CHITIETGIOHANG_ibfk_1` FOREIGN KEY (`magiohang`) REFERENCES `GIOHANG` (`magiohang`),
  CONSTRAINT `CHITIETGIOHANG_ibfk_2` FOREIGN KEY (`masanpham`) REFERENCES `SANPHAM` (`masanpham`),
  CONSTRAINT `CHITIETGIOHANG_ibfk_3` FOREIGN KEY (`mamau`) REFERENCES `MAUSACSANPHAM` (`mamau`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CHITIETGIOHANG`
--

LOCK TABLES `CHITIETGIOHANG` WRITE;
/*!40000 ALTER TABLE `CHITIETGIOHANG` DISABLE KEYS */;
/*!40000 ALTER TABLE `CHITIETGIOHANG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DONHANG`
--

DROP TABLE IF EXISTS `DONHANG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DONHANG` (
  `madonhang` int(11) NOT NULL AUTO_INCREMENT,
  `makhachhang` int(11) NOT NULL,
  `ngaydat` datetime DEFAULT NULL,
  `trangthaidonhang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tongtien` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`madonhang`),
  KEY `makhachhang` (`makhachhang`),
  CONSTRAINT `DONHANG_ibfk_1` FOREIGN KEY (`makhachhang`) REFERENCES `KHACHHANG` (`makhachhang`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DONHANG`
--

LOCK TABLES `DONHANG` WRITE;
/*!40000 ALTER TABLE `DONHANG` DISABLE KEYS */;
/*!40000 ALTER TABLE `DONHANG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GIOHANG`
--

DROP TABLE IF EXISTS `GIOHANG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GIOHANG` (
  `magiohang` int(11) NOT NULL AUTO_INCREMENT,
  `makhachhang` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`magiohang`),
  KEY `makhachhang` (`makhachhang`),
  CONSTRAINT `GIOHANG_ibfk_1` FOREIGN KEY (`makhachhang`) REFERENCES `KHACHHANG` (`makhachhang`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GIOHANG`
--

LOCK TABLES `GIOHANG` WRITE;
/*!40000 ALTER TABLE `GIOHANG` DISABLE KEYS */;
/*!40000 ALTER TABLE `GIOHANG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HINHANHSANPHAM`
--

DROP TABLE IF EXISTS `HINHANHSANPHAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HINHANHSANPHAM` (
  `mahinhanh` int(11) NOT NULL AUTO_INCREMENT,
  `masanpham` int(11) NOT NULL,
  `hinhanhkhac` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mahinhanh`),
  KEY `masanpham` (`masanpham`),
  CONSTRAINT `HINHANHSANPHAM_ibfk_1` FOREIGN KEY (`masanpham`) REFERENCES `SANPHAM` (`masanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HINHANHSANPHAM`
--

LOCK TABLES `HINHANHSANPHAM` WRITE;
/*!40000 ALTER TABLE `HINHANHSANPHAM` DISABLE KEYS */;
INSERT INTO `HINHANHSANPHAM` VALUES (1,1,'iphone-16-pro-max-titan-trang1.jpg','2024-12-31 14:04:50','2024-12-31 14:04:50'),(2,1,'iphone-16-pro-max-titan.jpg','2024-12-31 14:04:50','2024-12-31 14:04:50'),(3,1,'1.jpg','2024-12-31 14:04:51','2024-12-31 14:04:51'),(4,1,'2.jpg','2024-12-31 14:04:51','2024-12-31 14:04:51'),(5,1,'3.jpg','2024-12-31 14:04:51','2024-12-31 14:04:51'),(6,1,'4.jpg','2024-12-31 14:04:51','2024-12-31 14:04:51'),(7,1,'5.jpg','2024-12-31 14:04:51','2024-12-31 14:04:51');
/*!40000 ALTER TABLE `HINHANHSANPHAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `KHACHHANG`
--

DROP TABLE IF EXISTS `KHACHHANG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `KHACHHANG` (
  `makhachhang` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `hoten` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sodienthoai` varchar(10) DEFAULT NULL,
  `diachi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`makhachhang`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KHACHHANG`
--

LOCK TABLES `KHACHHANG` WRITE;
/*!40000 ALTER TABLE `KHACHHANG` DISABLE KEYS */;
/*!40000 ALTER TABLE `KHACHHANG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MAUSACSANPHAM`
--

DROP TABLE IF EXISTS `MAUSACSANPHAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MAUSACSANPHAM` (
  `mamau` int(11) NOT NULL AUTO_INCREMENT,
  `masanpham` int(11) NOT NULL,
  `tenmausanpham` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mausachinhanh` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mamau`),
  KEY `masanpham` (`masanpham`),
  CONSTRAINT `MAUSACSANPHAM_ibfk_1` FOREIGN KEY (`masanpham`) REFERENCES `SANPHAM` (`masanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAUSACSANPHAM`
--

LOCK TABLES `MAUSACSANPHAM` WRITE;
/*!40000 ALTER TABLE `MAUSACSANPHAM` DISABLE KEYS */;
INSERT INTO `MAUSACSANPHAM` VALUES (1,1,'Đen','iphone-16-pro-max-titan-den-.jpg','2024-12-31 14:04:38','2024-12-31 14:04:38'),(2,1,'Trắng','iphone-16-pro-max-titan-trang.jpg','2024-12-31 14:04:38','2024-12-31 14:04:38');
/*!40000 ALTER TABLE `MAUSACSANPHAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SANPHAM`
--

DROP TABLE IF EXISTS `SANPHAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SANPHAM` (
  `masanpham` int(11) NOT NULL AUTO_INCREMENT,
  `mathuonghieu` int(11) NOT NULL,
  `tensanpham` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `giasanpham` int(11) DEFAULT NULL,
  `soluongsanpham` int(11) DEFAULT NULL,
  `hedieuhanh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gpu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ram` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dungluong` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cameratruoc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `camerasau` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `congnghemanhinh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dophangiaimanhinh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `motasanpham` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hinhanhchinh` text,
  `trangthai` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`masanpham`),
  KEY `mathuonghieu` (`mathuonghieu`),
  CONSTRAINT `SANPHAM_ibfk_1` FOREIGN KEY (`mathuonghieu`) REFERENCES `THUONGHIEU` (`mathuonghieu`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SANPHAM`
--

LOCK TABLES `SANPHAM` WRITE;
/*!40000 ALTER TABLE `SANPHAM` DISABLE KEYS */;
INSERT INTO `SANPHAM` VALUES (1,1,'Samsung Galaxy S24 Ultra',33000000,15,'Andromakhachhang','Snapdragon 8 Gen 3','Adreno 740','12GB','512GB','12MP','200MP','Dynamic AMOLED 2X','3088x1440','5000mAh','Smartphone flagship của Samsung','galaxy-s24-ultra-thumb-600x600.jpg',0,'2024-12-31 14:02:49','2024-12-31 14:02:49'),(2,2,'Google Pixel 8 Pro',25000000,20,'Andromakhachhang','Google Tensor G3','Mali-G710','12GB','256GB','10.5MP','50MP','OLED','3120x1440','5000mAh','Smartphone camera đỉnh cao của Google','pixel-8-pro-thumb-600x600.jpg',0,'2024-12-31 14:02:49','2024-12-31 14:02:49'),(3,3,'OnePlus 11 Pro',28000000,25,'Andromakhachhang','Snapdragon 8 Gen 2','Adreno 730','16GB','256GB','16MP','50MP','Flumakhachhang AMOLED','3216x1440','5000mAh','Smartphone mạnh mẽ của OnePlus','oneplus-11-pro-thumb-600x600.jpg',0,'2024-12-31 14:02:49','2024-12-31 14:02:49'),(4,1,'Xiaomi 13 Pro',27000000,30,'Andromakhachhang','Snapdragon 8 Gen 2','Adreno 730','12GB','256GB','32MP','50MP','AMOLED','3200x1440','4820mAh','Smartphone hiệu năng cao từ Xiaomi','xiaomi-13-pro-thumb-600x600.jpg',0,'2024-12-31 14:02:49','2024-12-31 14:02:49'),(5,2,'Sony Xperia 1 V',35000000,12,'Andromakhachhang','Snapdragon 8 Gen 2','Adreno 740','12GB','512GB','12MP','48MP','OLED','3840x1644','5000mAh','Smartphone cao cấp cho người dùng chuyên nghiệp','sony-xperia-1-v-thumb-600x600.jpg',0,'2024-12-31 14:02:49','2024-12-31 14:02:49'),(6,3,'Oppo Find X6 Pro',32000000,18,'Andromakhachhang','Snapdragon 8 Gen 2','Adreno 740','12GB','256GB','32MP','50MP','AMOLED','3216x1440','5000mAh','Smartphone cao cấp của Oppo','oppo-find-x6-pro-thumb-600x600.jpg',0,'2024-12-31 14:02:49','2024-12-31 14:02:49'),(7,1,'Huawei Mate 60 Pro',34000000,22,'HarmonyOS','Kirin 9000S','Mali-G78','12GB','512GB','13MP','50MP','OLED','2848x1200','5000mAh','Smartphone cao cấp từ Huawei','huawei-mate-60-pro-thumb-600x600.jpg',0,'2024-12-31 14:02:49','2024-12-31 14:02:49'),(8,2,'Realme GT 2 Pro',22000000,28,'Andromakhachhang','Snapdragon 8 Gen 1','Adreno 730','12GB','256GB','50MP','50MP','AMOLED','3216x1440','5000mAh','Smartphone hiệu suất cao từ Realme','realme-gt-2-pro-thumb-600x600.jpg',0,'2024-12-31 14:02:49','2024-12-31 14:02:49'),(9,3,'Vivo X90 Pro',30000000,17,'Andromakhachhang','Dimensity 9200','Mali-G715','12GB','256GB','50MP','50MP','AMOLED','3200x1440','4700mAh','Smartphone flagship từ Vivo','vivo-x90-pro-thumb-600x600.jpg',0,'2024-12-31 14:02:49','2024-12-31 14:02:49');
/*!40000 ALTER TABLE `SANPHAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `THUONGHIEU`
--

DROP TABLE IF EXISTS `THUONGHIEU`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `THUONGHIEU` (
  `mathuonghieu` int(11) NOT NULL AUTO_INCREMENT,
  `tenthuonghieu` varchar(255) DEFAULT NULL,
  `trangthaithuonghieu` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mathuonghieu`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `THUONGHIEU`
--

LOCK TABLES `THUONGHIEU` WRITE;
/*!40000 ALTER TABLE `THUONGHIEU` DISABLE KEYS */;
INSERT INTO `THUONGHIEU` VALUES (1,'Apple',0,'2024-12-31 14:02:21','2024-12-31 14:02:21'),(2,'Samsung',0,'2024-12-31 14:02:21','2024-12-31 14:02:21'),(3,'Xiaomi',0,'2024-12-31 14:02:21','2024-12-31 14:02:21');
/*!40000 ALTER TABLE `THUONGHIEU` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'shopphone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-31 21:08:30
