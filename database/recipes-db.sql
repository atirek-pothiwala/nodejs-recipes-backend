-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 09, 2025 at 07:53 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipes-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `photo`, `first_name`, `last_name`, `email`, `password`, `created_at`) VALUES
(21, NULL, 'Chetna', 'Pothiwala', 'chetnapothiwala@recipes.com', '$2b$10$mnnjdybDaz88XhwMEu/McePsHvWmd6oW2A10EeJfP3OC80TZY3mV.', '2025-04-04'),
(34, '/uploads/accounts/1744220785577-889991134.jpg', 'Atirek', 'Pothiwala', 'atirekpothiwala@recipes.com', '$2b$10$Rxg9KRPf0ejf23eI/rhXruIdQuk7w95XS2qQcFmJvfgesmZPWtTgy', '2025-04-07');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `quantity` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `recipe_id`, `name`, `quantity`) VALUES
(54, 18, 'Eggs', '2 qty'),
(55, 18, 'Water', '1 tbsp'),
(56, 18, 'Pinch Salt', ''),
(57, 18, 'Pinch Pepper', ''),
(58, 18, 'Butter or Oil', '1 tbsp'),
(59, 18, 'Filling ingredients', ''),
(60, 19, 'Eggs', '2 qty'),
(61, 19, 'Water', '1 tbsp'),
(62, 19, 'Pinch Salt', ''),
(63, 19, 'Pinch Pepper', ''),
(64, 19, 'Butter or Oil', '1 tbsp'),
(65, 19, 'Filling ingredients', ''),
(66, 20, 'Eggs', '2 qty'),
(67, 20, 'Water', '1 tbsp'),
(68, 20, 'Pinch Salt', ''),
(69, 20, 'Pinch Pepper', ''),
(70, 20, 'Butter or Oil', '1 tbsp'),
(71, 20, 'Filling ingredients', ''),
(72, 21, 'Eggs', '2 qty'),
(73, 21, 'Water', '1 tbsp'),
(74, 21, 'Pinch Salt', ''),
(75, 21, 'Pinch Pepper', ''),
(76, 21, 'Butter or Oil', '1 tbsp'),
(77, 21, 'Filling ingredients', ''),
(78, 22, 'Eggs', '2 qty'),
(79, 22, 'Water', '1'),
(80, 22, 'Pinch Salt', '0'),
(81, 22, 'Pinch Pepper', '0'),
(82, 22, 'Butter or Oil', '1'),
(83, 22, 'Filling ingredients', '0'),
(84, 23, 'Eggs', '2'),
(85, 23, 'Water', '1'),
(86, 23, 'Pinch Salt', '0'),
(87, 23, 'Pinch Pepper', '0'),
(88, 23, 'Butter or Oil', '1'),
(89, 23, 'Filling ingredients', '0'),
(90, 24, 'Eggs', '2'),
(91, 24, 'Water', '1'),
(92, 24, 'Pinch Salt', '0'),
(93, 24, 'Pinch Pepper', '0'),
(94, 24, 'Butter or Oil', '1'),
(95, 24, 'Filling ingredients', '0');

-- --------------------------------------------------------

--
-- Table structure for table `instructions`
--

CREATE TABLE `instructions` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructions`
--

INSERT INTO `instructions` (`id`, `recipe_id`, `step_number`, `description`) VALUES
(44, 18, 1, 'Whisk eggs, water, salt and pepper.'),
(45, 18, 2, 'Melt butter in an 8-inch (20 cm) nonstick frying pan over medium heat. Pour in egg mixture. As eggs set around edge of pan, with spatula, gently push cooked portions toward centre of skillet. Tilt and rotate skillet to allow uncooked egg to flow into empty spaces.'),
(46, 18, 3, 'When eggs are almost set on surface but still look moist, cover half of omelette with filling. Slip spatula under unfilled side; fold over onto filled half.'),
(47, 18, 4, 'Cook for a minute, then slide omelette onto plate.'),
(48, 19, 1, 'Whisk eggs, water, salt and pepper.'),
(49, 19, 2, 'Melt butter in an 8-inch (20 cm) nonstick frying pan over medium heat. Pour in egg mixture. As eggs set around edge of pan, with spatula, gently push cooked portions toward centre of skillet. Tilt and rotate skillet to allow uncooked egg to flow into empty spaces.'),
(50, 19, 3, 'When eggs are almost set on surface but still look moist, cover half of omelette with filling. Slip spatula under unfilled side; fold over onto filled half.'),
(51, 19, 4, 'Cook for a minute, then slide omelette onto plate.'),
(52, 20, 1, 'Whisk eggs, water, salt and pepper.'),
(53, 20, 2, 'Melt butter in an 8-inch (20 cm) nonstick frying pan over medium heat. Pour in egg mixture. As eggs set around edge of pan, with spatula, gently push cooked portions toward centre of skillet. Tilt and rotate skillet to allow uncooked egg to flow into empty spaces.'),
(54, 20, 3, 'When eggs are almost set on surface but still look moist, cover half of omelette with filling. Slip spatula under unfilled side; fold over onto filled half.'),
(55, 20, 4, 'Cook for a minute, then slide omelette onto plate.'),
(56, 21, 1, 'Whisk eggs, water, salt and pepper.'),
(57, 21, 2, 'Melt butter in an 8-inch (20 cm) nonstick frying pan over medium heat. Pour in egg mixture. As eggs set around edge of pan, with spatula, gently push cooked portions toward centre of skillet. Tilt and rotate skillet to allow uncooked egg to flow into empty spaces.'),
(58, 21, 3, 'When eggs are almost set on surface but still look moist, cover half of omelette with filling. Slip spatula under unfilled side; fold over onto filled half.'),
(59, 21, 4, 'Cook for a minute, then slide omelette onto plate.'),
(60, 22, 1, 'Whisk eggs, water, salt and pepper.'),
(61, 22, 2, 'Melt butter in an 8-inch (20 cm) nonstick frying pan over medium heat. Pour in egg mixture. As eggs set around edge of pan, with spatula, gently push cooked portions toward centre of skillet. Tilt and rotate skillet to allow uncooked egg to flow into empty spaces.'),
(62, 22, 3, 'When eggs are almost set on surface but still look moist, cover half of omelette with filling. Slip spatula under unfilled side; fold over onto filled half.'),
(63, 22, 4, 'Cook for a minute, then slide omelette onto plate.'),
(64, 23, 1, 'Whisk eggs, water, salt and pepper.'),
(65, 23, 2, 'Melt butter in an 8-inch (20 cm) nonstick frying pan over medium heat. Pour in egg mixture. As eggs set around edge of pan, with spatula, gently push cooked portions toward centre of skillet. Tilt and rotate skillet to allow uncooked egg to flow into empty spaces.'),
(66, 23, 3, 'When eggs are almost set on surface but still look moist, cover half of omelette with filling. Slip spatula under unfilled side; fold over onto filled half.'),
(67, 23, 4, 'Cook for a minute, then slide omelette onto plate.'),
(68, 24, 1, 'Whisk eggs, water, salt and pepper.'),
(69, 24, 2, 'Melt butter in an 8-inch (20 cm) nonstick frying pan over medium heat. Pour in egg mixture. As eggs set around edge of pan, with spatula, gently push cooked portions toward centre of skillet. Tilt and rotate skillet to allow uncooked egg to flow into empty spaces.'),
(70, 24, 3, 'When eggs are almost set on surface but still look moist, cover half of omelette with filling. Slip spatula under unfilled side; fold over onto filled half.'),
(71, 24, 4, 'Cook for a minute, then slide omelette onto plate.');

-- --------------------------------------------------------

--
-- Table structure for table `nutritions`
--

CREATE TABLE `nutritions` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `calories` varchar(10) NOT NULL,
  `fat` varchar(10) NOT NULL,
  `saturated_fat` varchar(10) NOT NULL,
  `trans_fat` varchar(10) NOT NULL,
  `carbohydrate` varchar(10) NOT NULL,
  `fibre` varchar(10) NOT NULL,
  `sugar` varchar(10) NOT NULL,
  `protein` varchar(10) NOT NULL,
  `sodium` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nutritions`
--

INSERT INTO `nutritions` (`id`, `recipe_id`, `calories`, `fat`, `saturated_fat`, `trans_fat`, `carbohydrate`, `fibre`, `sugar`, `protein`, `sodium`) VALUES
(2, 18, '148 mg', '11 g', '3 g', '0 g', '2 g', '0 g', '0 g', '12 g', '207 mg');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `chef` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  `prep_time` int(11) NOT NULL,
  `cook_time` int(11) NOT NULL,
  `servings` int(11) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `photo`, `name`, `description`, `chef`, `type`, `prep_time`, `cook_time`, `servings`, `created_at`) VALUES
(18, '/uploads/recipes/1743793119802-109992208.jpg', 'Omelette', 'Omelettes are infinitely customizable! This recipe is perfect for busy weekdays, but below we offer a few variations that can be delicious when you have some more time to play around in the kitchen.', 'Raju Bhai', 1, 2, 4, 1, '2025-04-05'),
(19, '/uploads/recipes/1743809255606-689314103.jpg', 'Burger', 'Burgers are infinitely customizable! This recipe is perfect for busy weekdays, but below we offer a few variations that can be delicious when you have some more time to play around in the kitchen.', 'McDonald\'s', 1, 15, 10, 1, '2025-04-05'),
(20, '/uploads/recipes/1743809458343-79758035.jpeg', 'Coffee', 'Coffee are infinitely customizable! This recipe is perfect for busy weekdays, but below we offer a few variations that can be delicious when you have some more time to play around in the kitchen.', 'Starbucks', 1, 2, 10, 1, '2025-04-05'),
(21, '/uploads/recipes/1743809518858-21120862.jpg', 'Frankie Delight', 'Frankie are infinitely customizable! This recipe is perfect for busy weekdays, but below we offer a few variations that can be delicious when you have some more time to play around in the kitchen.', 'Frankie Station', 1, 15, 10, 1, '2025-04-05'),
(22, '/uploads/recipes/1743809618102-700289683.jpg', 'French Fries', 'French Fries are infinitely customizable! This recipe is perfect for busy weekdays, but below we offer a few variations that can be delicious when you have some more time to play around in the kitchen.', 'McDonald\'s', 1, 10, 10, 2, '2025-04-05'),
(23, '/uploads/recipes/1743809675686-266136521.jpg', 'Pav Bhaji', 'Pav Bhaji are infinitely customizable! This recipe is perfect for busy weekdays, but below we offer a few variations that can be delicious when you have some more time to play around in the kitchen.', 'Kaka Ni Pav Bhaji', 1, 30, 15, 3, '2025-04-05'),
(24, '/uploads/recipes/1743810697244-676322145.jpg', 'Vada Pav', 'Vada Pav are infinitely customizable! This recipe is perfect for busy weekdays, but below we offer a few variations that can be delicious when you have some more time to play around in the kitchen.', 'Tasty Vada Pav', 1, 20, 5, 2, '2025-04-05');

-- --------------------------------------------------------

--
-- Table structure for table `tips`
--

CREATE TABLE `tips` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tips`
--

INSERT INTO `tips` (`id`, `recipe_id`, `description`) VALUES
(48, 18, 'Nutrition facts are based on a 2 egg omelette without filling.'),
(49, 18, 'Using the proper skillet or pan is important to successful omelette making. The ideal skillet for a 1, 2 or 3-egg omelette is about 8 inches (20 cm) in diameter at the base. It should be shallow with sloping sides to make it easier to slide the omelette out of the skillet and onto a plate.'),
(50, 18, 'An omelette can be made quickly and easier if the skillet is hot when the egg mixture is added. The skillet is hot enough when a drop of water rolls around instead of bursting into steam immediately.'),
(51, 18, 'Preparing individual omelettes, rather than one large one, will result in lighter and fluffier omelettes that are easier to handle.'),
(52, 18, 'The Perfect Omelette recipe can be multiplied for as many servings as you need. Use 1/2 cup (125 mL) of egg mixture for each 2-egg omelette and 3/4 cup (175 mL) for a 3-egg omelette.'),
(53, 18, 'The fewer eggs, the quicker it will cook, so you can use a smaller skillet for a one- or two-egg omelette and one that measures 8-inches (20 cm) at the base for a 3-egg omelette.'),
(54, 18, 'You can use cooking spray in place of the butter or oil.'),
(55, 18, 'Covering the folded omelette and cooking for an extra minute helps to heat up the filling, melt any cheese, and finish cooking any remaining undercooked egg. This step is optional if your filling doesn’t require heating and the egg already appears cooked to your liking.'),
(56, 19, 'Nutrition facts are based on a 2 egg omelette without filling.'),
(57, 19, 'Using the proper skillet or pan is important to successful omelette making. The ideal skillet for a 1, 2 or 3-egg omelette is about 8 inches (20 cm) in diameter at the base. It should be shallow with sloping sides to make it easier to slide the omelette out of the skillet and onto a plate.'),
(58, 19, 'An omelette can be made quickly and easier if the skillet is hot when the egg mixture is added. The skillet is hot enough when a drop of water rolls around instead of bursting into steam immediately.'),
(59, 19, 'Preparing individual omelettes, rather than one large one, will result in lighter and fluffier omelettes that are easier to handle.'),
(60, 19, 'The Perfect Omelette recipe can be multiplied for as many servings as you need. Use 1/2 cup (125 mL) of egg mixture for each 2-egg omelette and 3/4 cup (175 mL) for a 3-egg omelette.'),
(61, 19, 'The fewer eggs, the quicker it will cook, so you can use a smaller skillet for a one- or two-egg omelette and one that measures 8-inches (20 cm) at the base for a 3-egg omelette.'),
(62, 19, 'You can use cooking spray in place of the butter or oil.'),
(63, 19, 'Covering the folded omelette and cooking for an extra minute helps to heat up the filling, melt any cheese, and finish cooking any remaining undercooked egg. This step is optional if your filling doesn’t require heating and the egg already appears cooked to your liking.'),
(64, 20, 'Nutrition facts are based on a 2 egg omelette without filling.'),
(65, 20, 'Using the proper skillet or pan is important to successful omelette making. The ideal skillet for a 1, 2 or 3-egg omelette is about 8 inches (20 cm) in diameter at the base. It should be shallow with sloping sides to make it easier to slide the omelette out of the skillet and onto a plate.'),
(66, 20, 'An omelette can be made quickly and easier if the skillet is hot when the egg mixture is added. The skillet is hot enough when a drop of water rolls around instead of bursting into steam immediately.'),
(67, 20, 'Preparing individual omelettes, rather than one large one, will result in lighter and fluffier omelettes that are easier to handle.'),
(68, 20, 'The Perfect Omelette recipe can be multiplied for as many servings as you need. Use 1/2 cup (125 mL) of egg mixture for each 2-egg omelette and 3/4 cup (175 mL) for a 3-egg omelette.'),
(69, 20, 'The fewer eggs, the quicker it will cook, so you can use a smaller skillet for a one- or two-egg omelette and one that measures 8-inches (20 cm) at the base for a 3-egg omelette.'),
(70, 20, 'You can use cooking spray in place of the butter or oil.'),
(71, 20, 'Covering the folded omelette and cooking for an extra minute helps to heat up the filling, melt any cheese, and finish cooking any remaining undercooked egg. This step is optional if your filling doesn’t require heating and the egg already appears cooked to your liking.'),
(72, 21, 'Nutrition facts are based on a 2 egg omelette without filling.'),
(73, 21, 'Using the proper skillet or pan is important to successful omelette making. The ideal skillet for a 1, 2 or 3-egg omelette is about 8 inches (20 cm) in diameter at the base. It should be shallow with sloping sides to make it easier to slide the omelette out of the skillet and onto a plate.'),
(74, 21, 'An omelette can be made quickly and easier if the skillet is hot when the egg mixture is added. The skillet is hot enough when a drop of water rolls around instead of bursting into steam immediately.'),
(75, 21, 'Preparing individual omelettes, rather than one large one, will result in lighter and fluffier omelettes that are easier to handle.'),
(76, 21, 'The Perfect Omelette recipe can be multiplied for as many servings as you need. Use 1/2 cup (125 mL) of egg mixture for each 2-egg omelette and 3/4 cup (175 mL) for a 3-egg omelette.'),
(77, 21, 'The fewer eggs, the quicker it will cook, so you can use a smaller skillet for a one- or two-egg omelette and one that measures 8-inches (20 cm) at the base for a 3-egg omelette.'),
(78, 21, 'You can use cooking spray in place of the butter or oil.'),
(79, 21, 'Covering the folded omelette and cooking for an extra minute helps to heat up the filling, melt any cheese, and finish cooking any remaining undercooked egg. This step is optional if your filling doesn’t require heating and the egg already appears cooked to your liking.'),
(80, 22, 'Nutrition facts are based on a 2 egg omelette without filling.'),
(81, 22, 'Using the proper skillet or pan is important to successful omelette making. The ideal skillet for a 1, 2 or 3-egg omelette is about 8 inches (20 cm) in diameter at the base. It should be shallow with sloping sides to make it easier to slide the omelette out of the skillet and onto a plate.'),
(82, 22, 'An omelette can be made quickly and easier if the skillet is hot when the egg mixture is added. The skillet is hot enough when a drop of water rolls around instead of bursting into steam immediately.'),
(83, 22, 'Preparing individual omelettes, rather than one large one, will result in lighter and fluffier omelettes that are easier to handle.'),
(84, 22, 'The Perfect Omelette recipe can be multiplied for as many servings as you need. Use 1/2 cup (125 mL) of egg mixture for each 2-egg omelette and 3/4 cup (175 mL) for a 3-egg omelette.'),
(85, 22, 'The fewer eggs, the quicker it will cook, so you can use a smaller skillet for a one- or two-egg omelette and one that measures 8-inches (20 cm) at the base for a 3-egg omelette.'),
(86, 22, 'You can use cooking spray in place of the butter or oil.'),
(87, 22, 'Covering the folded omelette and cooking for an extra minute helps to heat up the filling, melt any cheese, and finish cooking any remaining undercooked egg. This step is optional if your filling doesn’t require heating and the egg already appears cooked to your liking.'),
(88, 23, 'Nutrition facts are based on a 2 egg omelette without filling.'),
(89, 23, 'Using the proper skillet or pan is important to successful omelette making. The ideal skillet for a 1, 2 or 3-egg omelette is about 8 inches (20 cm) in diameter at the base. It should be shallow with sloping sides to make it easier to slide the omelette out of the skillet and onto a plate.'),
(90, 23, 'An omelette can be made quickly and easier if the skillet is hot when the egg mixture is added. The skillet is hot enough when a drop of water rolls around instead of bursting into steam immediately.'),
(91, 23, 'Preparing individual omelettes, rather than one large one, will result in lighter and fluffier omelettes that are easier to handle.'),
(92, 23, 'The Perfect Omelette recipe can be multiplied for as many servings as you need. Use 1/2 cup (125 mL) of egg mixture for each 2-egg omelette and 3/4 cup (175 mL) for a 3-egg omelette.'),
(93, 23, 'The fewer eggs, the quicker it will cook, so you can use a smaller skillet for a one- or two-egg omelette and one that measures 8-inches (20 cm) at the base for a 3-egg omelette.'),
(94, 23, 'You can use cooking spray in place of the butter or oil.'),
(95, 23, 'Covering the folded omelette and cooking for an extra minute helps to heat up the filling, melt any cheese, and finish cooking any remaining undercooked egg. This step is optional if your filling doesn’t require heating and the egg already appears cooked to your liking.'),
(96, 24, 'Nutrition facts are based on a 2 egg omelette without filling.'),
(97, 24, 'Using the proper skillet or pan is important to successful omelette making. The ideal skillet for a 1, 2 or 3-egg omelette is about 8 inches (20 cm) in diameter at the base. It should be shallow with sloping sides to make it easier to slide the omelette out of the skillet and onto a plate.'),
(98, 24, 'An omelette can be made quickly and easier if the skillet is hot when the egg mixture is added. The skillet is hot enough when a drop of water rolls around instead of bursting into steam immediately.'),
(99, 24, 'Preparing individual omelettes, rather than one large one, will result in lighter and fluffier omelettes that are easier to handle.'),
(100, 24, 'The Perfect Omelette recipe can be multiplied for as many servings as you need. Use 1/2 cup (125 mL) of egg mixture for each 2-egg omelette and 3/4 cup (175 mL) for a 3-egg omelette.'),
(101, 24, 'The fewer eggs, the quicker it will cook, so you can use a smaller skillet for a one- or two-egg omelette and one that measures 8-inches (20 cm) at the base for a 3-egg omelette.'),
(102, 24, 'You can use cooking spray in place of the butter or oil.'),
(103, 24, 'Covering the folded omelette and cooking for an extra minute helps to heat up the filling, melt any cheese, and finish cooking any remaining undercooked egg. This step is optional if your filling doesn’t require heating and the egg already appears cooked to your liking.');

-- --------------------------------------------------------

--
-- Table structure for table `variations`
--

CREATE TABLE `variations` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `variations`
--

INSERT INTO `variations` (`id`, `recipe_id`, `name`, `description`) VALUES
(1, 18, 'Western Omelette', 'Spray skillet with cooking spray or heat 1 tsp (5 mL) vegetable oil in skillet. Add 1/4 cup (60 mL) finely chopped ham, 2 tbsp (30 mL) chopped sweet green pepper and 1 tbsp (15 mL) finely chopped onion; cook, stirring frequently, until vegetables are tender. Pour in egg mixture and cook as directed in the Basic Omelette recipe.'),
(2, 18, 'Fine Herbs Omelette', 'Add 2 tbsp (30 mL) finely chopped parsley, 1 tsp (5 mL) finely chopped green onion, 1/2 tsp (2 mL) dried tarragon and 1/8 tsp (0.5 mL) finely chopped garlic to egg mixture in the Basic Omelette recipe. Cook as directed.'),
(3, 18, 'Mushroom and Spinach Omelette', 'Filling ingredients: 3 tbsp (45 mL) each sauteed mushrooms, wilted spinach (or thawed and well-drained frozen spinach), sliced green onions, and shredded old Cheddar cheese.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipe_id_1` (`recipe_id`);

--
-- Indexes for table `instructions`
--
ALTER TABLE `instructions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipe_id_2` (`recipe_id`);

--
-- Indexes for table `nutritions`
--
ALTER TABLE `nutritions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipe_id_5` (`recipe_id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tips`
--
ALTER TABLE `tips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipe_id_3` (`recipe_id`);

--
-- Indexes for table `variations`
--
ALTER TABLE `variations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipe_id_4` (`recipe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `instructions`
--
ALTER TABLE `instructions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `nutritions`
--
ALTER TABLE `nutritions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tips`
--
ALTER TABLE `tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `variations`
--
ALTER TABLE `variations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `fk_recipe_id_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `instructions`
--
ALTER TABLE `instructions`
  ADD CONSTRAINT `fk_recipe_id_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `nutritions`
--
ALTER TABLE `nutritions`
  ADD CONSTRAINT `fk_recipe_id_5` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tips`
--
ALTER TABLE `tips`
  ADD CONSTRAINT `fk_recipe_id_3` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `variations`
--
ALTER TABLE `variations`
  ADD CONSTRAINT `fk_recipe_id_4` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
