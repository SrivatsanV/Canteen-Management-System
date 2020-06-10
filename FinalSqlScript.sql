-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`admin` (
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'admin',
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
-- Create admin
INSERT INTO `test`.`admin`(`email`,`password`) values('admin@gmail.com','admin123');
-- -----------------------------------------------------
-- Table `test`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`items` (
  `item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(45) NOT NULL,
  `item_type` VARCHAR(10) NOT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`item_id`, `item_name`),
  UNIQUE INDEX `item_name_UNIQUE` (`item_name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`menu` (
  `canteen_id` INT(11) NOT NULL,
  `item_id` INT(11) NOT NULL,
  `price` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`canteen_id`, `item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`night_canteen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`night_canteen` (
  `canteen_id` INT(11) NOT NULL AUTO_INCREMENT,
  `canteen_name` VARCHAR(45) NOT NULL,
  `phone_num` VARCHAR(10) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'canteen',
  PRIMARY KEY (`canteen_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`operations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`operations` (
  `roles` VARCHAR(10) NOT NULL,
  `permission` VARCHAR(45) NOT NULL,
  `operation` VARCHAR(45) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`ordered_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`ordered_items` (
  `item_id` INT(11) NULL DEFAULT NULL,
  `order_id` INT(11) NULL DEFAULT NULL,
  `price` INT(11) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`orders` (
  `order_id` INT(11) NOT NULL AUTO_INCREMENT,
  `uid` INT(11) NOT NULL,
  `canteen_id` INT(11) NOT NULL,
  `order_status` VARCHAR(45) NOT NULL,
  `total_price` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`permissions` (
  `roles` VARCHAR(10) NOT NULL,
  `permission` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`roles`, `permission`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Creating initial permissions for admin
INSERT INTO `test`.`permissions` values('admin','admin_admindash'),('admin','assign_perm');
-- -----------------------------------------------------
-- Table `test`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`users` (
  `uid` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone_num` VARCHAR(10) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`uid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
