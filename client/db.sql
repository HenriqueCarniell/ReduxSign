-- Active: 1706295515506@@localhost@3306@validajwt
use validajwt

show databases;

create table Usuario (
    idusuario int PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100),
    senha VARCHAR(100)
);

show tables;

select * from usuario;