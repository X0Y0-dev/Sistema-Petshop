<p>Para a segunda atualização, utilizei o Modelo Lógico fornecido pelo BrModelo para criar a estruturas de dados no MySQL Workbench.</p>
<p align="center"><img src="https://github.com/user-attachments/assets/6c92a2fa-708f-4d2b-8e66-ccb28624a9c5"></p>
<p>Por mais que o código tenha sido bem parecido com o Modelo Lógico do BrModelo, este será o modelo definitivo ao qual trabalharei.</p>
<p>Então, logo em seguida, criei minha tabela e já posicionei 'SHOW TABLES' ao topo para não me perder:</p>

```sql
CREATE DATABASE banco_petshop;
USE banco_petshop;
SHOW TABLES;
```

<p>Após criar o Banco de Dados banco_petshop, criei as tabelas:</p>

```sql
CREATE TABLE cliente(
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome_cliente VARCHAR(50) NOT NULL,
    sobrenome_cliente VARCHAR(50) NOT NULL,
    telefone VARCHAR (20) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(255),
    senha VARCHAR(50)
);
SELECT * FROM cliente;
```
<p align="center"><img src="https://github.com/user-attachments/assets/3c8eea3d-4379-4832-a374-ada0dda70e95"></p>

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
SELECT * FROM pet;
```
<p align="center"><img src="https://github.com/user-attachments/assets/0da7249c-a076-489f-9afb-cbc4be77414a"></p>

```sql
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
SELECT* FROM petshop;
```
<p align="center"><img src="https://github.com/user-attachments/assets/29df254f-e790-46ea-a8b8-8ef4444e38c0"></p>

```sql
CREATE TABLE servico(
    id_servico INT PRIMARY KEY AUTO_INCREMENT,
    tipo_servico VARCHAR(30) NOT NULL,
    data_hora DATETIME NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    observacoes TEXT,
    status VARCHAR(20)
);
SELECT * FROM servico;
```
<p align="center"><img src="https://github.com/user-attachments/assets/a0a8f29d-dbee-424a-9676-e2a034f2ea13"></p>

<p>Ao final, para organizar todas as tabelas, foi criada automaticamente uma "tabela de tabelas", onde todas as tabelas criadas ficam organizadas:</p>
<p align="center"><img src="https://github.com/user-attachments/assets/d2fa5937-be67-4c1c-ac88-0514829a48df"></p>
<p>Para que essa "tabela de tabelas" fosse exibida, foi necessário usar o comando 'SHOW TABLES'. Agora, para verificar as entidades de dentro de cada tabela, foi necessário usar o comando 'SELECT * FROM nome_tabela'.</p>
