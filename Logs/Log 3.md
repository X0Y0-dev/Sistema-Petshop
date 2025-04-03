<p>Para a terceira atualização, o alvo foi o banco de dados. Dei uma otimizada nele, criei as tabelas de relações e o comentei. As tabelas atualizadas são:</p>
<p>Tabela do Pet:</p>

```sql
CREATE TABLE pet(
    id_pet INT PRIMARY KEY AUTO_INCREMENT,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(30),
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
    peso DECIMAL(5,2),
    tamanho VARCHAR(50),
    nome_pet VARCHAR(50) NOT NULL,
    castrado BOOLEAN DEFAULT FALSE
);
ALTER TABLE pet ADD COLUMN id_cliente INT NOT NULL;
ALTER TABLE pet ADD CONSTRAINT fk_pet_cliente
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente);
SELECT * FROM pet;
```
<p align="center"><img src="https://github.com/user-attachments/assets/c974f305-1fa6-4a7e-8459-a6af4eb845ce"></p>

<p>Tabela do Serviço:</p>

```sql
CREATE TABLE servico(
    id_servico INT PRIMARY KEY AUTO_INCREMENT,
    tipo_servico VARCHAR(30) NOT NULL,
    data_hora DATETIME NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    observacoes TEXT,
    status VARCHAR(20)
);
ALTER TABLE servico ADD COLUMN id_petshop INT;
ALTER TABLE servico ADD CONSTRAINT fk_servico_petshop
FOREIGN KEY (id_petshop) REFERENCES petshop(id_petshop);
SELECT * FROM servico;
```
<p align="center"><img src="https://github.com/user-attachments/assets/8fac2a4f-025b-423b-a233-dc4d8452a15d"></p>

<p>Já as novas tabelas são:</p>
<p>Relação entre Cliente e Petshop:</p>

```sql
CREATE TABLE cliente_frequenta_petshop(
    id_cliente INT NOT NULL,
    id_petshop INT NOT NULL,
    data_hora_visita DATETIME NOT NULL,
    PRIMARY KEY (id_cliente, id_petshop, data_hora_visita),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_petshop) REFERENCES petshop(id_petshop)
);
SELECT * FROM cliente_frequenta_petshop;
```
<p align="center"><img src="https://github.com/user-attachments/assets/ec8a4318-c69b-48a1-8a25-bb84094949b0"></p>

<p>Relação entre Pet e Serviço:</p>

```sql
CREATE TABLE pet_servico(
    id_pet INT NOT NULL,
    id_servico INT NOT NULL,
    data_hora_execucao DATETIME NOT NULL,
    observacoes TEXT,
    PRIMARY KEY (id_pet, id_servico, data_hora_execucao),
    FOREIGN KEY (id_pet) REFERENCES pet(id_pet),
    FOREIGN KEY (id_servico) REFERENCES servico(id_servico)
);
SELECT * FROM pet_servico;
```
<p align="center"><img src="https://github.com/user-attachments/assets/8efeaf18-821a-4adb-a931-d04d383970c1"></p>

<p>E então, o código final no Workbench ficou assim:</p>

```sql
/*CRIANDO O BANCO DE DADOS*/
CREATE DATABASE banco_petshop;
USE banco_petshop;
/*FUNÇÃO PARA MOSTRAR TODAS AS TABELAS*/
SHOW TABLES;


/*CRIAÇÃO DA TABELA CLIENTE*/
CREATE TABLE cliente(
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome_cliente VARCHAR(50) NOT NULL,
    sobrenome_cliente VARCHAR(50) NOT NULL,
    telefone VARCHAR (20) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(255),
    senha VARCHAR(50)
);
/*MOSTRAR ITENS DA TABELA CLIENTE*/
SELECT * FROM cliente;


/*CRIAÇÃO DA TABELA PET*/
CREATE TABLE pet(
    id_pet INT PRIMARY KEY AUTO_INCREMENT,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(30),
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
    peso DECIMAL(5,2),
    tamanho VARCHAR(50),
    nome_pet VARCHAR(50) NOT NULL,
    castrado BOOLEAN DEFAULT FALSE
);
/*CRIAÇÃO DA COLUNA PARA GUARDAR PRIMARY KEY DO CLIENTE*/
ALTER TABLE pet ADD COLUMN id_cliente INT NOT NULL;
/*INSERINDO PRIMARY KEY DO CLINETE NA TABELA*/
ALTER TABLE pet ADD CONSTRAINT fk_pet_cliente
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente);
/*MOSTRAR ITENS DA TABELA PET*/
SELECT * FROM pet;


/*CRIAÇÃO DA TABEA PETSHOP*/
CREATE TABLE petshop(
    id_petshop INT PRIMARY KEY AUTO_INCREMENT,
    nome_petshop VARCHAR(50) NOT NULL,
    logradouro VARCHAR(50) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(30) NOT NULL,
    cep CHAR(8) NOT NULL,
    cidade VARCHAR(20) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    abertura TIME NOT NULL,
    fechamento TIME NOT NULL,
    dias_func INT(2) NOT NULL,
    dia_semana VARCHAR(15)
);
/*MOSTRAR ITENS DA TABELA PETSHOP*/
SELECT* FROM petshop;


/*CRIAÇÃO DA TABELA SERVIÇO*/
CREATE TABLE servico(
    id_servico INT PRIMARY KEY AUTO_INCREMENT,
    tipo_servico VARCHAR(30) NOT NULL,
    data_hora DATETIME NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    observacoes TEXT,
    status VARCHAR(20)
);
/*CRIAÇÃO DA COLUNA PARA GUARDAR PRIMARY KEY DE PETSHOP*/
ALTER TABLE servico ADD COLUMN id_petshop INT;
/*INSERINDO PRIMARY KEY DE PETSHOP DENTRO DA TABELA*/
ALTER TABLE servico ADD CONSTRAINT fk_servico_petshop
FOREIGN KEY (id_petshop) REFERENCES petshop(id_petshop);
/*MOSTRAR ITENS DA TABELA SERVICO*/
SELECT * FROM servico;


/*CRIAÇÃO DA TABELA DE RELAÇÃO ENTRE CLIENTE E PETSHOP*/
CREATE TABLE cliente_frequenta_petshop(
    id_cliente INT NOT NULL,
    id_petshop INT NOT NULL,
    data_hora_visita DATETIME NOT NULL,
    PRIMARY KEY (id_cliente, id_petshop, data_hora_visita),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_petshop) REFERENCES petshop(id_petshop)
);
/*MOSTRAR ITENS DENTRO TABELA DE RELAÇÃO ENTRE CLIENTE E PETSHOP*/
SELECT * FROM cliente_frequenta_petshop;


/*CRIAÇÃO DA TABELA DE RELAÇÃO ENTRE PET E SERVIÇO*/
CREATE TABLE pet_servico(
    id_pet INT NOT NULL,
    id_servico INT NOT NULL,
    data_hora_execucao DATETIME NOT NULL,
    observacoes TEXT,
    PRIMARY KEY (id_pet, id_servico, data_hora_execucao),
    FOREIGN KEY (id_pet) REFERENCES pet(id_pet),
    FOREIGN KEY (id_servico) REFERENCES servico(id_servico)
);
/*MOSTRAR ITENS DENTRO DA TABELA DE RELAÇÃO ENTRE PET E SERVIÇO*/
SELECT * FROM pet_servico;
```
<p align="center"><img src="https://github.com/user-attachments/assets/40244452-8341-4b64-b293-ab6cf48ed500"></p>
