-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-07-2017 a las 21:59:31
-- Versión del servidor: 10.1.16-MariaDB
-- Versión de PHP: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `autobusapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autobus`
--

CREATE TABLE `autobus` (
  `id` int(11) NOT NULL,
  `matricula` varchar(45) NOT NULL,
  `idruta` int(11) NOT NULL,
  `capacidad` int(45) DEFAULT NULL,
  `idconductor` int(11) NOT NULL,
  `idmonitor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `autobus`
--

INSERT INTO `autobus` (`id`, `matricula`, `idruta`, `capacidad`, `idconductor`, `idmonitor`) VALUES
(4, 'MCFKJPRTIYY', 1, 40, 1, 1),
(16, 'HKFROQPE4', 1, 51, 1, 1),
(18, 'FG4GEPlCF', 1, 56, 1, 1),
(22, 'LFKVNCPERITF', 1, 43, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductor`
--

CREATE TABLE `conductor` (
  `idconductor` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `conductor`
--

INSERT INTO `conductor` (`idconductor`, `nombre`, `telefono`) VALUES
(1, 'Nacho', '961024123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursoescolar`
--

CREATE TABLE `cursoescolar` (
  `idcursoescolar` int(11) NOT NULL,
  `nombrecurso` varchar(45) NOT NULL,
  `clase` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cursoescolar`
--

INSERT INTO `cursoescolar` (`idcursoescolar`, `nombrecurso`, `clase`) VALUES
(1, 'Primero', '1A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matriculado`
--

CREATE TABLE `matriculado` (
  `idmatriculado` int(11) NOT NULL,
  `primer_nombre` varchar(40) NOT NULL,
  `segundo nombre` varchar(45) DEFAULT NULL,
  `apellido paterno` varchar(45) NOT NULL,
  `apellido materno` varchar(45) DEFAULT NULL,
  `dni` varchar(15) NOT NULL,
  `idruta` int(11) NOT NULL,
  `idcursoescolar` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `rutaIda` varchar(45) NOT NULL,
  `rutaVuelta` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `matriculado`
--

INSERT INTO `matriculado` (`idmatriculado`, `primer_nombre`, `segundo nombre`, `apellido paterno`, `apellido materno`, `dni`, `idruta`, `idcursoescolar`, `estado`, `rutaIda`, `rutaVuelta`) VALUES
(1, 'Alfonso', NULL, 'Relles', 'Almenar', '53255802', 1, 1, 'Estupendo', '1', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monitor`
--

CREATE TABLE `monitor` (
  `idmonitor` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `monitor`
--

INSERT INTO `monitor` (`idmonitor`, `nombre`, `email`, `telefono`) VALUES
(1, 'Manolo', 'manolo@gmail.com', '64414232');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parada`
--

CREATE TABLE `parada` (
  `idparada` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `idruta` int(11) NOT NULL,
  `idrutaIda` int(11) NOT NULL,
  `idrutaVuelta` int(11) NOT NULL,
  `tiempoparada` int(11) DEFAULT NULL,
  `coordenadas` double DEFAULT NULL,
  `horaIdaLlegada` time NOT NULL,
  `horaIdaSalida` time NOT NULL,
  `horaVueltaLlegada` time NOT NULL,
  `horaVueltaSalida` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `parada`
--

INSERT INTO `parada` (`idparada`, `nombre`, `idruta`, `idrutaIda`, `idrutaVuelta`, `tiempoparada`, `coordenadas`, `horaIdaLlegada`, `horaIdaSalida`, `horaVueltaLlegada`, `horaVueltaSalida`) VALUES
(1, 'San Francisco', 1, 1, 1, 43, 32.4, '03:00:00', '02:00:00', '03:06:00', '02:08:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pariente`
--

CREATE TABLE `pariente` (
  `idpariente` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `foto` varchar(45) NOT NULL,
  `idmatriculado` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `idruta` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `numParadas` int(11) NOT NULL,
  `idrutaIda` int(11) NOT NULL,
  `idrutaVuelta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`idruta`, `nombre`, `numParadas`, `idrutaIda`, `idrutaVuelta`) VALUES
(1, 'RutaValencia', 33, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutaida`
--

CREATE TABLE `rutaida` (
  `idrutaIda` int(11) NOT NULL,
  `numParadas` varchar(45) NOT NULL,
  `idparada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rutaida`
--

INSERT INTO `rutaida` (`idrutaIda`, `numParadas`, `idparada`) VALUES
(1, '43', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutavuelta`
--

CREATE TABLE `rutavuelta` (
  `idrutaVuelta` int(11) NOT NULL,
  `numParadas` varchar(45) NOT NULL,
  `idparada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rutavuelta`
--

INSERT INTO `rutavuelta` (`idrutaVuelta`, `numParadas`, `idparada`) VALUES
(1, '32', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autobus`
--
ALTER TABLE `autobus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_autobus_ruta_idx` (`idruta`),
  ADD KEY `fk_autobus_monitor_idx` (`idmonitor`),
  ADD KEY `fk_autobus_conductor_idx` (`idconductor`);

--
-- Indices de la tabla `conductor`
--
ALTER TABLE `conductor`
  ADD PRIMARY KEY (`idconductor`);

--
-- Indices de la tabla `cursoescolar`
--
ALTER TABLE `cursoescolar`
  ADD PRIMARY KEY (`idcursoescolar`);

--
-- Indices de la tabla `matriculado`
--
ALTER TABLE `matriculado`
  ADD PRIMARY KEY (`idmatriculado`),
  ADD KEY `fk_matriculado_ruta_idx` (`idruta`),
  ADD KEY `fk_matriculado_cursoescolar_idx` (`idcursoescolar`);

--
-- Indices de la tabla `monitor`
--
ALTER TABLE `monitor`
  ADD PRIMARY KEY (`idmonitor`);

--
-- Indices de la tabla `parada`
--
ALTER TABLE `parada`
  ADD PRIMARY KEY (`idparada`),
  ADD KEY `fk_parada_rutaIda_idx` (`idrutaIda`),
  ADD KEY `fk_parada_rutaVuelta_idx` (`idrutaVuelta`);

--
-- Indices de la tabla `pariente`
--
ALTER TABLE `pariente`
  ADD PRIMARY KEY (`idpariente`),
  ADD KEY `fk_pariente_matriculado1_idx` (`idmatriculado`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`idruta`),
  ADD KEY `fk_ruta_rutaVuelta_idx` (`idrutaVuelta`),
  ADD KEY `fk_ruta_rutaIda_idx` (`idrutaIda`);

--
-- Indices de la tabla `rutaida`
--
ALTER TABLE `rutaida`
  ADD PRIMARY KEY (`idrutaIda`);

--
-- Indices de la tabla `rutavuelta`
--
ALTER TABLE `rutavuelta`
  ADD PRIMARY KEY (`idrutaVuelta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autobus`
--
ALTER TABLE `autobus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `conductor`
--
ALTER TABLE `conductor`
  MODIFY `idconductor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `cursoescolar`
--
ALTER TABLE `cursoescolar`
  MODIFY `idcursoescolar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `matriculado`
--
ALTER TABLE `matriculado`
  MODIFY `idmatriculado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `monitor`
--
ALTER TABLE `monitor`
  MODIFY `idmonitor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `parada`
--
ALTER TABLE `parada`
  MODIFY `idparada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `pariente`
--
ALTER TABLE `pariente`
  MODIFY `idpariente` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `idruta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `rutaida`
--
ALTER TABLE `rutaida`
  MODIFY `idrutaIda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `rutavuelta`
--
ALTER TABLE `rutavuelta`
  MODIFY `idrutaVuelta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autobus`
--
ALTER TABLE `autobus`
  ADD CONSTRAINT `fk_autobus_conductor` FOREIGN KEY (`idconductor`) REFERENCES `conductor` (`idconductor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_autobus_monitor` FOREIGN KEY (`idmonitor`) REFERENCES `monitor` (`idmonitor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_autobus_ruta` FOREIGN KEY (`idruta`) REFERENCES `ruta` (`idruta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `matriculado`
--
ALTER TABLE `matriculado`
  ADD CONSTRAINT `fk_matriculado_cursoescolar` FOREIGN KEY (`idcursoescolar`) REFERENCES `cursoescolar` (`idcursoescolar`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_matriculado_ruta` FOREIGN KEY (`idruta`) REFERENCES `ruta` (`idruta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `parada`
--
ALTER TABLE `parada`
  ADD CONSTRAINT `fk_parada_rutaIda` FOREIGN KEY (`idrutaIda`) REFERENCES `rutaida` (`idrutaIda`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_parada_rutaVuelta` FOREIGN KEY (`idrutaVuelta`) REFERENCES `rutavuelta` (`idrutaVuelta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pariente`
--
ALTER TABLE `pariente`
  ADD CONSTRAINT `fk_pariente_matriculado1` FOREIGN KEY (`idmatriculado`) REFERENCES `matriculado` (`idmatriculado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD CONSTRAINT `fk_ruta_rutaIda` FOREIGN KEY (`idrutaIda`) REFERENCES `rutaida` (`idrutaIda`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ruta_rutaVuelta` FOREIGN KEY (`idrutaVuelta`) REFERENCES `rutavuelta` (`idrutaVuelta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
