-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com
-- Generation Time: May 07, 2025 at 11:14 AM
-- Server version: 8.0.35
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laurynwade`
--

-- --------------------------------------------------------

--
-- Table structure for table `characters_to_arcs`
--

CREATE TABLE `characters_to_arcs` (
  `combo_id` int NOT NULL,
  `character_id` int DEFAULT NULL,
  `arc_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `characters_to_arcs`
--

INSERT INTO `characters_to_arcs` (`combo_id`, `character_id`, `arc_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 2, 2),
(12, 2, 3),
(13, 2, 4),
(14, 2, 5),
(15, 2, 6),
(16, 2, 7),
(17, 2, 9),
(18, 2, 10),
(19, 3, 4),
(20, 3, 5),
(21, 3, 7),
(22, 4, 1),
(23, 4, 2),
(24, 4, 9),
(25, 4, 10),
(26, 5, 4),
(27, 5, 5),
(28, 5, 7),
(29, 5, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `characters_to_arcs`
--
ALTER TABLE `characters_to_arcs`
  ADD PRIMARY KEY (`combo_id`),
  ADD KEY `character_id` (`character_id`),
  ADD KEY `arc_id` (`arc_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `characters_to_arcs`
--
ALTER TABLE `characters_to_arcs`
  MODIFY `combo_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `characters_to_arcs`
--
ALTER TABLE `characters_to_arcs`
  ADD CONSTRAINT `characters_to_arcs_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `unholy_characters` (`id`),
  ADD CONSTRAINT `characters_to_arcs_ibfk_2` FOREIGN KEY (`arc_id`) REFERENCES `character_arcs` (`arc_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
