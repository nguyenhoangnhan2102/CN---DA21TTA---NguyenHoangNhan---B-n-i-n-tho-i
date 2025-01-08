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
INSERT INTO `CHITIETDONHANG` VALUES (1,1,4,33000000,1,'2025-01-08 08:23:12','2025-01-08 08:23:12'),(1,10,20,2850000,2,'2025-01-08 08:23:12','2025-01-08 08:23:12'),(1,10,21,2850000,2,'2025-01-08 08:23:12','2025-01-08 08:23:12'),(2,1,3,33000000,1,'2025-01-08 08:24:24','2025-01-08 08:24:24'),(2,1,4,33000000,1,'2025-01-08 08:24:24','2025-01-08 08:24:24'),(2,3,8,28000000,1,'2025-01-08 08:24:24','2025-01-08 08:24:24'),(3,6,12,5800000,4,'2025-01-08 08:24:42','2025-01-08 08:24:42'),(3,6,13,5800000,2,'2025-01-08 08:24:42','2025-01-08 08:24:42'),(4,2,5,25000000,1,'2025-01-08 08:25:34','2025-01-08 08:25:34'),(4,2,6,25000000,1,'2025-01-08 08:25:34','2025-01-08 08:25:34'),(5,4,10,27000000,1,'2025-01-08 08:25:47','2025-01-08 08:25:47');
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
INSERT INTO `CHITIETGIOHANG` VALUES (12,6,13,1,5800000.00),(13,8,16,1,22000000.00),(14,8,17,1,22000000.00),(15,7,14,1,4000000.00),(16,2,6,1,25000000.00),(17,2,5,1,25000000.00),(18,5,11,1,35000000.00),(19,10,21,1,2850000.00),(20,1,4,1,33000000.00),(21,10,21,1,2850000.00),(22,10,20,1,2850000.00);
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
  `trangthaidonhang` int(11) DEFAULT '0',
  `tongtien` int(11) DEFAULT NULL,
  `hotenkhachhang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sdtkhachhang` int(11) DEFAULT NULL,
  `diachigiaohang` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`madonhang`),
  KEY `makhachhang` (`makhachhang`),
  CONSTRAINT `DONHANG_ibfk_1` FOREIGN KEY (`makhachhang`) REFERENCES `KHACHHANG` (`makhachhang`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DONHANG`
--

LOCK TABLES `DONHANG` WRITE;
/*!40000 ALTER TABLE `DONHANG` DISABLE KEYS */;
INSERT INTO `DONHANG` VALUES (1,1,'2025-01-08 10:23:12',0,44400000,'admin@gmail.com',987863073,'Trà Vinh','2025-01-08 08:23:12','2025-01-08 08:23:12'),(2,2,'2025-01-08 10:24:24',0,94000000,'nhan@gmail.com',332859190,'Vĩnh Long','2025-01-08 08:24:24','2025-01-08 08:24:24'),(3,2,'2025-01-08 10:24:42',0,34800000,'nhan@gmail.com',332859190,'Vĩnh Long','2025-01-08 08:24:42','2025-01-08 08:24:42'),(4,3,'2025-01-08 10:25:34',0,50000000,'phucfix@gmail.com',395954564,'Cà Mau','2025-01-08 08:25:34','2025-01-08 08:25:34'),(5,3,'2025-01-08 10:25:47',0,27000000,'phucfix@gmail.com',395954564,'Cà Mau','2025-01-08 08:25:47','2025-01-08 08:25:47');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GIOHANG`
--

LOCK TABLES `GIOHANG` WRITE;
/*!40000 ALTER TABLE `GIOHANG` DISABLE KEYS */;
INSERT INTO `GIOHANG` VALUES (12,1,'2025-01-08 08:26:55','2025-01-08 08:26:55'),(13,1,'2025-01-08 08:26:58','2025-01-08 08:26:58'),(14,1,'2025-01-08 08:26:59','2025-01-08 08:26:59'),(15,1,'2025-01-08 08:27:03','2025-01-08 08:27:03'),(16,2,'2025-01-08 08:27:22','2025-01-08 08:27:22'),(17,2,'2025-01-08 08:27:24','2025-01-08 08:27:24'),(18,2,'2025-01-08 08:27:27','2025-01-08 08:27:27'),(19,1,'2025-01-08 15:51:21','2025-01-08 15:51:21'),(20,1,'2025-01-08 15:51:25','2025-01-08 15:51:25'),(21,2,'2025-01-08 15:56:15','2025-01-08 15:56:15'),(22,2,'2025-01-08 15:56:17','2025-01-08 15:56:17');
/*!40000 ALTER TABLE `GIOHANG` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KHACHHANG`
--

LOCK TABLES `KHACHHANG` WRITE;
/*!40000 ALTER TABLE `KHACHHANG` DISABLE KEYS */;
INSERT INTO `KHACHHANG` VALUES (1,'admin@gmail.com','$2b$10$x7p1ksB8oShmvPIsTWP0yO0JLuBmQFLypU4ih3lIDk4iWxHpMVeJq',1,'admin@gmail.com','0987863073','Trà Vinh','2025-01-08 07:40:58','2025-01-08 07:40:58'),(2,'nhan@gmail.com','$2b$10$9whjr1KdrNKQXhiyfFrpTONvKJ2jvKDGEL8WZ15rPBnSgoGYNO7wK',0,'Nguyễn Hoàng Nhân','0332859190','Vĩnh Long','2025-01-08 08:23:24','2025-01-08 08:23:24'),(3,'phucfix@gmail.com','$2b$10$OY8yG6qFWYsP3/rt9GWRJusdbDPH0pYjTo2SZs.tsgEWBf72mHzLu',0,'phucfix@gmail.com','0395954564','Cà Mau','2025-01-08 08:25:03','2025-01-08 08:25:03');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAUSACSANPHAM`
--

LOCK TABLES `MAUSACSANPHAM` WRITE;
/*!40000 ALTER TABLE `MAUSACSANPHAM` DISABLE KEYS */;
INSERT INTO `MAUSACSANPHAM` VALUES (1,1,'Xám','01a9de09-ac3c-43fe-9455-148f9ebd7022.jpg','2025-01-08 07:42:59','2025-01-08 07:42:59'),(2,1,'Tím','d41e4483-4f67-4aea-a211-6ff49b1ea197.jpg','2025-01-08 07:43:13','2025-01-08 07:43:13'),(3,1,'Đen','f3e8d3cf-e047-4c78-84a2-fb360d3a72a7.jpg','2025-01-08 07:43:26','2025-01-08 07:43:26'),(4,1,'Vàng','e9f5c95d-09fc-43d2-9ef3-f674453539a0.jpg','2025-01-08 07:43:37','2025-01-08 07:43:37'),(5,2,'Xanh dương','da8a20e9-bce5-4205-b425-08993502e145.jpg','2025-01-08 07:50:38','2025-01-08 07:50:38'),(6,2,'Xanh lá','216849ed-311f-4ea8-aef9-46f5084a5fb5.jpg','2025-01-08 07:50:45','2025-01-08 07:50:45'),(7,3,'Xanh Dương','70448394-805d-4d0e-a624-e072978f7642.jpg','2025-01-08 07:53:05','2025-01-08 07:53:05'),(8,3,'Xanh Bạc Hà','a9315169-f8a8-4f70-9f7d-e73f984b05ab.jpg','2025-01-08 07:53:16','2025-01-08 07:53:16'),(9,4,'Đen','8695b3b1-a3d7-4b89-a6c6-0cc83d776228.jpg','2025-01-08 07:56:42','2025-01-08 07:56:42'),(10,4,'Bạc','ef88e66b-48ce-4da4-a821-ef613595b905.jpg','2025-01-08 07:56:51','2025-01-08 07:56:51'),(11,5,'Xám','12ac7942-db82-4a0a-83ed-ea9689406d89.jpg','2025-01-08 07:59:32','2025-01-08 07:59:32'),(12,6,'Đen','c34696f0-9030-433f-9a3f-01606a6fef55.jpg','2025-01-08 08:01:23','2025-01-08 08:01:23'),(13,6,'Tím','9190bfb0-b246-4b96-bdcd-f9e2e2d3e662.jpg','2025-01-08 08:01:36','2025-01-08 08:01:36'),(14,7,'Xanh Dương','403cdb93-f247-4919-978c-428efd0cd4a6.jpg','2025-01-08 08:03:15','2025-01-08 08:03:15'),(15,8,'Titan Sa Mạc','52d08b24-d809-400f-9385-dac176223435.jpg','2025-01-08 08:09:26','2025-01-08 08:09:26'),(16,8,'Titan Trắng','f2146a50-e545-4973-b910-c6b772a069a6.png','2025-01-08 08:09:36','2025-01-08 08:09:36'),(17,8,'Titan Đen','c6f681f7-7440-4b57-aecd-bd4cce272e05.jpg','2025-01-08 08:09:47','2025-01-08 08:09:47'),(18,9,'Hồng','771a92a7-0c29-497c-b091-a79995da8465.jpg','2025-01-08 08:11:02','2025-01-08 08:11:02'),(19,9,'Xanh Mòng Két','caebbb0d-486a-402e-b633-91e44ab8d700.png','2025-01-08 08:11:17','2025-01-08 08:11:17'),(20,10,'Xanh','0b4f89c1-6954-4003-9478-8589f7e1cb64.jpg','2025-01-08 08:14:42','2025-01-08 08:14:42'),(21,10,'Đen','cf22ac0a-a421-4aa7-9ec0-dc4a1b9fe157.jpg','2025-01-08 08:14:49','2025-01-08 08:14:49');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SANPHAM`
--

LOCK TABLES `SANPHAM` WRITE;
/*!40000 ALTER TABLE `SANPHAM` DISABLE KEYS */;
INSERT INTO `SANPHAM` VALUES (1,2,'Samsung Galaxy S24 Ultra 5G 12GB/256GB',33000000,20,'Android 14','Snapdragon 8 Gen 3','Adreno 740','12GB','512GB','12MP','200MP','Dynamic AMOLED 2X','3088x1440','5000mAh','Samsung Galaxy S24 Ultra mẫu điện thoại cao cấp được ra mắt vào đầu năm 2024, sản phẩm tiếp tục kế thừa và cải tiến từ thế hệ trước. Điểm đặc biệt là sử dụng chip Snapdragon 8 Gen 3 for Galaxy, camera 200 MP và tích hợp nhiều tính năng AI.','ce261478-8306-456f-9fc1-3bfa4997cff6.jpg',0,'2025-01-08 07:40:12','2025-01-08 07:40:12'),(2,2,'Samsung Galaxy S24 FE 5G 8GB/128GB',25000000,20,'Android 14','Google Tensor G3','Mali-G710','8GB','128GB','10.5MP','50MP','OLED','3120x1440','5000mAh','là bước nhảy vọt với hiệu suất và trải nghiệm người dùng được nâng cấp toàn diện. Với vi xử lý Exynos 2400e, không chỉ mạnh mẽ cho mọi tác vụ mà còn xuất sắc trong việc tối ưu AI. Bên cạnh đó, màn hình mở rộng và camera chất lượng vượt trội là những dấu ấn đặc biệt giúp Galaxy S24 FE tỏa sáng.','55877c82-65a3-4f73-b6c6-64c00a497b84.jpg',0,'2025-01-08 07:40:12','2025-01-08 07:40:12'),(3,2,'Samsung Galaxy Z Flip6 5G 12GB/256GB',28000000,20,'Android 14','Snapdragon 8 Gen 2','Adreno 730','16GB','256GB','16MP','50MP','Chính: Dynamic AMOLED 2X, Phụ: Super AMOLED','3216x1440','5000mAh','Kiệt tác của thiết kế và công nghệ hàng đầu với mẫu điện thoại Samsung Galaxy Z Flip6 làm say đắm mọi người dùng không chỉ qua khả năng gập ấn tượng mà còn sở hữu hiệu năng mạnh mẽ, có tích hợp AI vượt trội,... Không chỉ là một sản phẩm công nghệ thông thường đây còn là một phụ kiện thời trang nâng tầm phong cách người dùng.','cc776989-6b06-4c86-a53b-afd596b16c00.jpg',0,'2025-01-08 07:40:12','2025-01-08 07:40:12'),(4,3,'Xiaomi POCO M6 6GB/128GB',27000000,20,'Android 14','Snapdragon 8 Gen 2','Adreno 730','6GB','128GB','32MP','50MP','AMOLED','3200x1440','4820mAh','Bạn đang tìm kiếm một chiếc smartphone giá cả phải chăng nhưng sở hữu camera chất lượng hàng đầu. Xiaomi POCO M6 chính là sự lựa chọn tuyệt vời dành cho bạn. Với camera chính 108 MP sắc nét cùng thiết kế hiện đại và hiệu năng mạnh mẽ, POCO M6 sẽ nâng tầm trải nghiệm di động của bạn.','80656252-c966-4eef-ad67-d82577703508.jpg',0,'2025-01-08 07:40:12','2025-01-08 07:40:12'),(5,4,'OPPO Find X8 5G 16GB/512GB',35000000,20,'Android 15','Snapdragon 8 Gen 2','Adreno 740','16GB','512GB','12MP','48MP','OLED','3840x1644','5000mAh','OPPO Find X8 thu hút sự chú ý với thiết kế viền màn hình siêu mỏng, mang lại vẻ đẹp hiện đại và tinh tế. Kích thước nhỏ gọn giúp dễ dàng thao tác bằng một tay, trong khi khả năng chụp ảnh vượt trội và thời lượng pin lâu dài khiến sản phẩm càng thêm hấp dẫn.','897c3d6d-8846-439a-9c3b-33c534eed2ff.jpg',0,'2025-01-08 07:40:12','2025-01-08 07:40:12'),(6,4,'OPPO A3 6GB/128GB',5800000,20,'Android 14','Snapdragon 8 Gen 2','Adreno 740','12GB','256GB','32MP','50MP','AMOLED','3216x1440','5000mAh','OPPO A3 6GB/128GB không chỉ là một chiếc điện thoại thông minh, mà còn là một người bạn đồng hành đáng tin cậy. Với khả năng chịu được va đập, rơi rớt và cả những tác động từ môi trường khắc nghiệt, thiết bị đều sẵn sàng đồng hành cùng bạn trong mọi cuộc phiêu lưu.','c5680c14-b60a-4af2-8401-69ceba4292bd.jpg',0,'2025-01-08 07:40:12','2025-01-08 07:40:12'),(7,4,'OPPO A18 4GB/64GB',4000000,20,'Android 13','Kirin 9000S','Mali-G78','4GB','64GB','13MP','50MP','OLED','2848x1200','5000mAh','OPPO A18 - một trong những sản phẩm điện thoại giá rẻ được OPPO giới thiệu tại thị trường Việt Nam trong những tháng cuối năm 2023. Thiết kế của máy vẫn giữ nguyên phong cách quen thuộc như các sản phẩm điện thoại OPPO A, đi kèm với đó là một màn hình sắc nét cùng một hiệu năng ổn định.','7fa5a8da-7f9e-4b58-b3cf-ac0836f6e9cf.jpg',0,'2025-01-08 07:40:12','2025-01-08 07:40:12'),(8,1,'iPhone 16 Pro Max 256GB',22000000,20,'iOS 18','Snapdragon 8 Gen 1','Adreno 730','12GB','256GB','50MP','50MP','AMOLED','3216x1440','5000mAh','Trong thế giới công nghệ phát triển không ngừng, iPhone 16 Pro Max khẳng định Apple là biểu tượng đổi mới và tiên phong. Với công nghệ tiên tiến, thiết kế tinh tế và hiệu năng mạnh mẽ, thiết bị này trở thành công cụ hỗ trợ đẳng cấp và phụ kiện thời thượng trong cuộc sống.','e68a4384-861b-4a29-848b-de2ee932137b.jpg',0,'2025-01-08 07:40:12','2025-01-08 07:40:12'),(9,1,'iPhone 16 Plus 128GB',30000000,20,'iOS 18','Dimensity 9200','Mali-G715','12GB','256GB','50MP','50MP','AMOLED','3200x1440','4700mAh','Sự ra mắt ấn tượng vào tháng 09/2024, Apple đã một lần nữa khẳng định vị thế dẫn đầu của mình trên thị trường smartphone với sự ra mắt của dòng iPhone 16. Với iPhone 16 Plus không chỉ kế thừa những ưu điểm vượt trội từ các phiên bản trước mà còn được trang bị nhiều cải tiến đột phá, chip mới mẻ hơn, thiết kế độc đáo hay tương thích thông minh tuyệt đối cho mọi “điểm chạm” của bạn trong cuộc sống','537baa38-9e00-442e-96bb-f300e77b3995.jpg',1,'2025-01-08 07:40:12','2025-01-08 07:40:12'),(10,5,'realme Note 60 4GB/64GB',2850000,20,'Android 14','Unisoc Tiger T612','Mali-G57','4GB','64GB','5 MP','Chính 32 MP & Cảm biến Flicker',' IPS LCD','HD+ (720 x 1600 Pixels)','5000 mAh','Với phân khúc giá rẻ, realme Note 60 4GB/64GB thu hút mạnh mẽ nhờ màn hình IPS LCD sắc nét, bộ xử lý mạnh mẽ và pin bền lâu. Thiết kế hiện đại chinh phục người dùng, đồng thời tạo nên trải nghiệm mượt mà, tích hợp đầy đủ các tính năng cần thiết cho nhu cầu sử dụng hằng ngày.','3c95e9d2-2b68-4cd9-8136-e78e61945fc7.jpg',0,'2025-01-08 08:13:47','2025-01-08 08:13:47');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `THUONGHIEU`
--

LOCK TABLES `THUONGHIEU` WRITE;
/*!40000 ALTER TABLE `THUONGHIEU` DISABLE KEYS */;
INSERT INTO `THUONGHIEU` VALUES (1,'Apple',0,'2025-01-08 07:40:05','2025-01-08 07:40:05'),(2,'Samsung',0,'2025-01-08 07:40:05','2025-01-08 07:40:05'),(3,'Xiaomi',0,'2025-01-08 07:40:05','2025-01-08 07:40:05'),(4,'Oppo',0,'2025-01-08 07:57:11','2025-01-08 07:57:11'),(5,'Realme',0,'2025-01-08 08:11:56','2025-01-08 08:11:56');
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

-- Dump completed on 2025-01-09  0:40:14
