-- Create DB
CREATE DATABASE IF NOT EXISTS web-scrapping-budget-mercado-libre_db;

-- Use schema
USE web-scrapping-budget-mercado-libre_db;

-- Create Tables
CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_account VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

