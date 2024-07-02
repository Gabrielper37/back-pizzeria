-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-07-2024 a las 04:43:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tpopizza`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `ID` int(255) NOT NULL,
  `Users` varchar(255) NOT NULL,
  `Passwords` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Ranks` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`ID`, `Users`, `Passwords`, `Email`, `Ranks`) VALUES
(4, 'admin', 'pizzeriaEl10', 'admin@gmail.com', 1),
(5, 'user', 'user', 'user@gmail.com', 0),
(6, 'Esteban', '1234', 'EstabanQuito@gmail.com', 0),
(44, 'Test', '$2a$08$4gOhf31TgM595my5OZF68OTsmc9.cdP1mHqVEd0uGamLaWg2aOpqu', 'test@gmail.com', 0),
(45, 'Test2', '$2a$08$yAl3u5pOWOA1bj3M40mGVOu1MuVYQ71fwxQXkLT8OehukeWaaf656', 'test2@gmail.com', 0),
(46, 'Test1234', '$2a$08$DHzbjqHZkjpVdv2.1M6yxO.9axlqumjl.VkjXsznGEs1vDZ2UWd4G', 'Test1234@gmail.com', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedidos` int(255) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `UsersPedidos` varchar(255) NOT NULL,
  `Producto1` varchar(255) NOT NULL,
  `Cantidad1` int(255) NOT NULL,
  `Producto2` varchar(255) DEFAULT NULL,
  `Cantidad2` int(255) DEFAULT NULL,
  `Producto3` varchar(255) DEFAULT NULL,
  `Cantidad3` int(255) DEFAULT NULL,
  `Producto4` varchar(255) DEFAULT NULL,
  `Cantidad4` int(255) DEFAULT NULL,
  `Producto5` varchar(255) DEFAULT NULL,
  `Cantidad5` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedidos`, `Fecha`, `UsersPedidos`, `Producto1`, `Cantidad1`, `Producto2`, `Cantidad2`, `Producto3`, `Cantidad3`, `Producto4`, `Cantidad4`, `Producto5`, `Cantidad5`) VALUES
(1, '2024-06-30 15:35:51', 'Esteban', 'Muzzarella', 3, 'Provoleta', 2, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '2024-06-30 15:36:56', 'Esteban', 'Muzzarella', 1, 'Provoleta', 4, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '2024-06-30 15:58:21', 'Esteban', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(4, '2024-06-30 15:58:44', 'Esteban', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(5, '2024-06-30 16:01:20', 'Esteban', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(6, '2024-06-30 16:01:34', 'Esteban', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(7, '2024-06-30 16:08:06', 'Esteban', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(8, '2024-06-30 16:08:31', 'Esteban', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(9, '2024-06-30 16:12:06', 'Esteban', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(10, '2024-06-30 16:13:11', 'Esteban', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(11, '2024-06-30 16:14:00', 'Esteban', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(12, '2024-06-30 16:46:24', 'Carlos', 'Muzzarella', 1, 'Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(13, '2024-07-01 02:20:13', 'Carlos', 'Pizza Muzzarella', 1, 'Pizza Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(14, '2024-07-01 02:20:32', 'Carlos', 'Pizza Muzzarella', 1, 'Pizza Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(15, '2024-07-01 02:20:44', 'Carlos', 'Pizza Muzzarella', 1, 'Pizza Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(16, '2024-07-01 02:21:15', 'Carlos', 'Pizza Muzzarella', 0, 'Pizza Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(17, '2024-07-01 02:21:25', 'Carlos', 'Pizza Muzzarella', 0, 'Pizza Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0),
(18, '2024-07-01 02:22:54', 'Carlos', 'Pizza Muzzarella', 1, 'Pizza Provoleta', 1, NULL, 6, 'Empanada Carne', 12, '', 0),
(19, '2024-07-01 02:24:07', 'Carlos', 'Pizza Muzzarella', 1, 'Pizza Provoleta', 1, 'Empanada Jamon y Queso', 6, 'Empanada Carne', 12, '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProductos` int(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Precio` int(255) NOT NULL,
  `TotalPedidos` int(255) NOT NULL,
  `Extra` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProductos`, `Nombre`, `Tipo`, `Precio`, `TotalPedidos`, `Extra`) VALUES
(1, 'Pizza Americana2', 'Pizza', 9200, 1, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedidos`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProductos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedidos` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProductos` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
