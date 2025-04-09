# Implementação de imagens no Banco de Dados

<p>Antes de implementar as imagens, dei uma arrumada no banco de dados. Com isso, quero dizer que refiz a tabela de Petshop, tendo a principal e mais duas, sendo elas, respectivamente, o horário e a localização:</p>
<p>Petshop:</p>

```sql
/*CRIAÇÃO DA TABELA PETSHOP*/
CREATE TABLE petshop(
    id_petshop INT PRIMARY KEY AUTO_INCREMENT,
    nome_petshop VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cep CHAR(8) NOT NULL
);
/*MOSTRAR DADOS DA TABELA PETSHOP*/
SELECT* FROM petshop;
/*MOSTRAR A ESTRUTURA DA TABELA PETSHOP*/
DESCRIBE petshop;
```
<p align="center"><img src="https://github.com/user-attachments/assets/d70bc14f-fe30-4447-b0be-c41f93803a32"></p>
<p align="center"><img src="https://github.com/user-attachments/assets/2d7e3739-914a-47a9-8ffa-366c57cbd1a3"></p>

<p>Endereço:</p>

```sql
/*CRIAÇÃO DA TABELA DE ENDEREÇO DO PETSHOP*/
CREATE TABLE endereco_petshop(
    id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(50) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(20) NOT NULL,
    cidade VARCHAR(20) NOT NULL,
    estado VARCHAR(2) NOT NULL
);
/*CRIAÇÃO DA COLUNA PARA GUARDAR PRIMARY KEY DE PETSHOP*/
ALTER TABLE endereco_petshop ADD COLUMN id_petshop INT;
/*INSERINDO PRIMARY KEY DE PETSHOP DENTRO DA TABELA*/
ALTER TABLE endereco_petshop ADD CONSTRAINT fk_endereco_petshop_petshop
FOREIGN KEY (id_petshop) REFERENCES petshop(id_petshop);
/*MOSTRAR DADOS DENTRO DA TABELA DE ENDEREÇO DO PETSHOP*/
SELECT * FROM endereco_petshop;
/*MOSTRAR A ESTRUTURA DA TABELA DE ENDEREÇO DO PETSHOP*/
DESCRIBE endereco_petshop;
```
<p align="center"><img src="https://github.com/user-attachments/assets/c1b1722b-39b2-4877-82e0-4a0519ad76e3"></p>
<p align="center"><img src="https://github.com/user-attachments/assets/b8abd5d9-ffb8-4a1c-84e6-dc702ed9dbda"></p>

<p>Horário:</p>

```sql
/*CRIAÇÃO DA TABELA DE HORÁRIOS DO PETSHOP*/
CREATE TABLE horario_petshop(
    id_horario INT PRIMARY KEY AUTO_INCREMENT,
    dia_semana VARCHAR(15),
    dias_func INT(2) NOT NULL,
    abertura TIME NOT NULL,
    fechamento TIME NOT NULL
);
/*CRIAÇÃO DA COLUNA PARA GUARDAR PRIMARY KEY DE PETSHOP*/
ALTER TABLE horario_petshop ADD COLUMN id_petshop INT;
/*INSERINDO PRIMARY KEY DE PETSHOP DENTRO DA TABELA*/
ALTER TABLE horario_petshop ADD CONSTRAINT fk_horario_petshop_petshop
FOREIGN KEY (id_petshop) REFERENCES petshop(id_petshop);
/*MOSTRAR DADOS DENTRO DA TABELA DE HORÁRIO DO PETSHOP*/
SELECT * FROM horario_petshop;
/*MOSTRAR A ESTRUTURA DA TABELA DE HORÁRIO DO PETSHOP*/
DESCRIBE horario_petshop;
```
<p align="center"><img src="https://github.com/user-attachments/assets/b02bae14-3172-46a7-9efa-6cd3f4e2d052"></p>
<p align="center"><img src="https://github.com/user-attachments/assets/2068cfc2-8ec3-41eb-9d48-5bcc586a9a19"></p>

<p>Agora, com Petshop devidamente arrumado, implementei a tabela de imagens:</p>


```sql
/*CRIAÇÃO DA TABELA DE IMAGENS*/
CREATE TABLE imagens(
    id_imagem INT PRIMARY KEY AUTO_INCREMENT,
    nome_arquivo VARCHAR(255) NOT NULL,
    caminho_imagem VARCHAR(255) NOT NULL,
    upload_imagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
/*MOSTRA DADOS DA TABELA IMAGENS*/
SELECT * FROM imagens;
/*MOSTRAR A ESTRUTURA DA TABELA IMAGENS*/
DESCRIBE imagens;
```
<p align="center"><img src="https://github.com/user-attachments/assets/7716357f-9ca6-409e-b1de-52228bde6738"></p>
<p align="center"><img src="https://github.com/user-attachments/assets/c84152b3-0b8f-4002-82ee-21b359fef9ef"></p>

<p>Agora, com o banco de dados feito por completo (espero), falta apenas fazer o frontend e o backend so site.</p>
