create database friday_Im_Online ;
use friday_Im_Online ;

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pergunta TEXT NOT NULL
);


CREATE TABLE respostas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_quiz INT NOT NULL,
  texto TEXT NOT NULL,
  correta BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (id_quiz) REFERENCES quiz(id)
);


CREATE TABLE respostas_usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_quiz INT NOT NULL,
  id_resposta INT NOT NULL,
  acertou BOOLEAN,
  data_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_quiz) REFERENCES quiz(id),
  FOREIGN KEY (id_resposta) REFERENCES respostas(id)
);


CREATE TABLE ranking (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  pontuacao INT DEFAULT 0,
  data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
