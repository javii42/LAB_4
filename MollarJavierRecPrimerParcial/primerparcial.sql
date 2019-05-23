-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2019 a las 03:42:47
-- Versión del servidor: 10.1.34-MariaDB
-- Versión de PHP: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `primerparcial`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actores`
--

CREATE TABLE `actores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellido` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nacionalidad` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_nacimiento` varchar(15) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '01/03/1990'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `actores`
--

INSERT INTO `actores` (`id`, `nombre`, `apellido`, `nacionalidad`, `fecha_nacimiento`) VALUES
(1, 'Robert', 'Downey Jr.', 'Americano', '04/04/1965'),
(2, 'Chris', 'Evans', 'Americano', '13/06/1981'),
(3, 'Jim', 'Carrey', 'Canadiense', '17/01/1962'),
(4, 'Leonardo', 'Dicaprio', 'Americano', '11/11/1974');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_estreno` varchar(15) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '01/03/2000',
  `cant_publico` int(11) NOT NULL,
  `ruta_foto` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT 'Imagenes/default.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id`, `nombre`, `tipo`, `fecha_estreno`, `cant_publico`, `ruta_foto`) VALUES
(1, 'Avengers', 'Otros', '26/05/2010', 250000000, 'Imagenes/avengers.jpg'),
(2, 'Titanic', 'amor', '07/07/1997', 300000000, 'Imagenes/titanic.jpg'),
(3, 'Memento', 'Otros', '07/02/2002', 2000000, 'Imagenes/memento.jpg'),
(4, 'John Wick', 'Otros', '08/01/2015', 1500000, 'Imagenes/johnWick.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actores`
--
ALTER TABLE `actores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actores`
--
ALTER TABLE `actores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
