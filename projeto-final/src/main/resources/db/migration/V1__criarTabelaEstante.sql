CREATE TABLE IF NOT EXISTS `estante` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`qtdPrateleiras` int NOT NULL,
	`qtdNichosPorPrateleira` int NOT NULL,
    `descricao` VARCHAR(250) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;