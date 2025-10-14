-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com
-- Generation Time: May 07, 2025 at 10:42 AM
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
-- Table structure for table `character_arcs`
--

CREATE TABLE `character_arcs` (
  `id` int NOT NULL,
  `arc_name` text NOT NULL,
  `arc_chapters` int NOT NULL,
  `arc_summary` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `character_arcs`
--

INSERT INTO `character_arcs` (`id`, `arc_name`, `arc_chapters`, `arc_summary`) VALUES
(1, 'Newcomer Arc', 4, 'Dmitri is one of the newer knights of the order in Wallachia, and his collogues are curious how he is so effective at hunting vampires.'),
(2, 'Initiation Arc', 20, 'There is a Children of Christ ceremony happening in the plaza. Something is about to go terribly wrong when a secret organization of vampires decide it may be the perfect time to strike young flesh. Dmitri saves the day by preventing the tragedy, and Lucian takes notice. To see how effective he really is, Lucian sends Dmitri on other life saving tasks.'),
(3, 'Vasile Arc', 5, 'Lucian wants to check on the condition of the baron in a neighboring town, so he sends Dmitri and gives him a posse from the order to go check on the baron. A seemingly simple task.'),
(4, 'Royal Arrival Arc', 6, 'Prince Karlo III arrives to Wallachia to check in with the new rising leadership and voice of the church. Dmitri also returns momentarily as well. Prince Karlo does not have a good feeling about Lucian or Dmitri since they may threaten his soon to be King status.'),
(5, 'Vasile Arc pt.2', 12, 'Dmitri returns to the odd town, now certain something is wrong with it. Lucian tells him about a powerful vampire named Vasile and warns that perhaps HE is behind all of it. By this point, Vasiles children are dead and Vasile gets fought.'),
(6, 'Betrayal Arc', 3, 'Lucian betrays Dmitris feelings and love, Lucian had been indulging in sinful acts of control, desire, and greed- when Dmitri had been under the impression they were a holy exception. This enrages Dmitri and he moves to fight Lucian.'),
(7, 'Hallucination Arc', 23, 'Lucian retaliates by threatening to reveal Dmitris secret to the entirety of the state and uses his unwillingness to harm innocents against him. Dmitri gets overtaken by his own guards and men by Lucians order and is trapped in the catacombs in chains. Given Datura.'),
(8, 'Investigation Arc', 20, 'Adousios eventually goes looking for Dmitri, concerned why someone so strong had just gone missing. Adousios eventually finds Dmitri and helps him escape the catacombs and the entire state, fleeing to Spain far to the west coast of the continent. In Spain, they discover Lucians true nature.'),
(9, 'The Latter Days', 6, 'Dmitri returns to Wallachia, unable to be comfortable with the amount of power and harm Lucian may have, knowing how smart the man is. He returns, everything of Wallachia almost grown over and destroyed, now he must face Lucian head on, in the true way he never was able to before.'),
(10, 'Epilogue', 1, 'Adousios and Dmitris friends pay remembrance.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `character_arcs`
--
ALTER TABLE `character_arcs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `character_arcs`
--
ALTER TABLE `character_arcs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
