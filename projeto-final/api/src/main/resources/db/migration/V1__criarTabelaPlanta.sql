CREATE TABLE IF NOT EXISTS `planta` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`nome` VARCHAR(255) NOT NULL,
    `dataPlantio` DATETIME,
	`idCategoriaPlanta` BIGINT(20) NOT NULL,
    `idNicho` BIGINT(20) NOT NULL,
    CONSTRAINT `fk_categoriaPlanta` FOREIGN KEY (`idCategoriaPlanta`) REFERENCES `categoria_planta`(`id`),
    CONSTRAINT `fk_nicho` FOREIGN KEY (`idNicho`) REFERENCES `nicho`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;
