# Organização de Dados
<p>Assim que o projeto foi iniciado, me garanti de criar o sistema de relações utilizando o software BrModelo.</p>
<p align="center"><img src="https://github.com/user-attachments/assets/96c4b56e-899d-4576-b7db-c2d78da69d82"></p>
<p>Dentro do BrModelo, criei as seguintes entidades via Modelo Conceitual:</p>

```
● Cliente:
  ° ID_CLIENTE (identificador)--------------------INT PRIMARY KEY AUTO_INCREMENT
  ° NOME------------------------------------------VARCHAR(50) NOT NULL
  ° SOBRENOME-------------------------------------VARCHAR(50) NOT NULL
  ° TELEFONE--------------------------------------VARCHAR(20) NOT NULL
  ° CPF-------------------------------------------VARCHAR(11) NOT NULL
  ° EMAIL-----------------------------------------VARCHAR(255)
  ° SENHA-----------------------------------------VARCHAR(50)

● Pet:
  ° ID_PET (identificador)------------------------INT PRIMARY KEY AUTO_INCREMENT
  ° ESPECIE---------------------------------------VARCHAR(50) NOT NULL
  ° RACA------------------------------------------VARCHAR(30)
  ° SEXO------------------------------------------CHAR(1) CHECK (SEXO IN ('M', 'F'))
  ° PESO------------------------------------------DECIMAL(5,2)
  ° TAMANHO---------------------------------------VARCHAR(10)
  ° NOME------------------------------------------VARCHAR(50) NOT NULL
  ° CASTRADO--------------------------------------BOOLEAN DEFAULT FALSE

● Petshop:
  ° ID_PETSHOP (identificador)--------------------INT PRIMARY KEY AUTO_INCREMENT
  ° NOME------------------------------------------VARCHAR(50) NOT NULL
  ° LOGRADOURO------------------------------------VARCHAR(100) NOT NULL
  ° NUMERO----------------------------------------VARCHAR(10) NOT NULL
  ° COMPLEMENTO-----------------------------------VARCHAR(50)
  ° BAIRRO----------------------------------------VARCHAR(30) NOT NULL
  ° CEP-------------------------------------------CHAR(8) NOT NULL
  ° CIDADE----------------------------------------VARCHAR(30) NOT NULL
  ° ESTADO----------------------------------------CHAR(2) NOT NULL
  ° TELEFONE--------------------------------------VARCHAR(20) NOT NULL
  ° ABERTURA--------------------------------------TIME NOT NULL
  ° FECHAMENTO------------------------------------TIME NOT NULL
  ° DIAS_FUNC-------------------------------------INT(2) NOT NULL
  ° DIA_SEMANA------------------------------------VARCHAR(15)

● Servico:
  ° ID_SERVICO (indicador)------------------------INT PRIMARY KEY AUTO_INCREMENT
  ° TIPO_SERVICO----------------------------------VARCHAR(30) NOT NULL
  ° DATA_HORA-------------------------------------DATETIME NOT NULL
  ° VALOR-----------------------------------------DECIMAL(10,2) NOT NULL
  ° OBSERVACOES-----------------------------------TEXT
  ° STATUS----------------------------------------VARCHAR(20)
```

<p>Aqueles que não possuem a propriedade "NOT NULL" quer dizer que são opcionais, não importantes.</p>
<p>Para finalizar, as relações adicionadas foram as seguintes:</p>

```
CLIENTE (1) —— (0:N) PET
    CLIENTE (1) -> Um pet, para ser um pet, necessariamente precisa ter um dono, porém, o mesmo pet pode ter vários donos
    PET (0:N) -> Um cliente não necessariamente precisa ter um pet, assim como pode ter diversos

CLIENTE (0:N) —— (0:N) PETSHOP 
    CLIENTE (0:N) -> Um petshop pode acabar não tendo clientes, assim como pode ter vários
    PETSHOP (0:N) -> Uma pessoa pode não ir a um petshop, assim como pode ir a vários

PETSHOP (1) —— (0:N) SERVICO
    PETSHOP (1) -> Um serviço não precisa de um pet para existir, porém, ele pode atender vários pets
    SERVICO (0:N) -> Um pet não precisa recorrer a um serviço, assim como pode receber diversos tratamentos
  
PET (0:N) —— (0:N) SERVICO
    PET (0:N) -> Um serviço pode muito bem ser executado fora de um petshop, assim como pode ser feito em vários petshops
    SERVICO (0:N) -> Um petsho não precisa oferecer serviços, mas também pode oferecer vários.
```
<p align="center"><img src="https://github.com/user-attachments/assets/4ecd18e0-ede8-47a8-8a6c-492244696316"></p>

<p>Assim que o Modelo Conceitual do projeto estava concluido, tratei de o converter para o Modelo Lógico, mostrando qual entidade / relação recebia que identificador:</p>

<p align="center"><img src="https://github.com/user-attachments/assets/73766f68-3043-451d-8809-18a3c033071e"></p>

<p>Consequentemente, assim que o Modelo Lógico foi criado, já o converti para o Modelo Físico, vulgo "o código já pronto em SQL":</p>

```sql
/* Lógico_1: */

CREATE TABLE Servico (
    ID_SERVICO INT PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
    TIPO_SERVICO VARCHAR(30) NOT NULL,
    DATA_HORA DATETIME NOT NULL,
    VALOR DECIMAL(10,2) NOT NULL,
    OBSERVACOES TEXT,
    STATUS VARCHAR(20)
);

CREATE TABLE Cliente (
    ID_CLIENTE INT PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(50) NOT NULL,
    SOBRENOME VARCHAR(50) NOT NULL,
    TELEFONE VARCHAR(20) NOT NULL,
    CPF VHARCHAR(11) NOT NULL,
    EMAIL VARCHAR(255)
);

CREATE TABLE Pet (
    NOME VARCHAR(50) NOT NULL,
    ESPECIE VARCHAR(50) NOT NULL,
    RACA VARCHAR(30),
    SEXO CHAR(1) CHECK (SEXO IN ('M', 'F')),
    PESO DECIMAL(5,2),
    TAMANHO VARCHAR(10),
    ID_PET INT PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
    CASTRADO BOOLEAN DEFAULT FALSE
);

CREATE TABLE Petshop (
    ID_PETSHOP INT PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(50) NOT NULL,
    LOGRADOURO VARCHAR(100) NOT NULL,
    NUMERO VARCHAR(10) NOT NULL,
    COMPLEMENTO VARCHAR(50),
    BAIRRO VARCHAR(30) NOT NULL,
    CEP CHAR(8) NOT NULL,
    CIDADE VARCHAR(30) NOT NULL,
    ESTADO CHAR(2) NOT NULL,
    TELEFONE VARCHAR(20) NOT NULL,
    ABERTURA TIME NOT NULL,
    FECHAMENTO TIME NOT NULL,
    DIAS_FUNC INT(2) NOT NULL,
    DIA_SEMANA VARCHAR(15)
);

CREATE TABLE Tem (
    fk_Cliente_ID_CLIENTE INT PRIMARY KEY AUTO_INCREMENT,
    fk_Pet_ID_PET INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE Frequenta (
    fk_Cliente_ID_CLIENTE INT PRIMARY KEY AUTO_INCREMENT,
    fk_Petshop_ID_PETSHOP INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE Tratamento (
    fk_Servico_ID_SERVICO INT PRIMARY KEY AUTO_INCREMENT,
    fk_Pet_ID_PET INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE Trabalho (
    fk_Petshop_ID_PETSHOP INT PRIMARY KEY AUTO_INCREMENT,
    fk_Servico_ID_SERVICO INT PRIMARY KEY AUTO_INCREMENT
);
 
ALTER TABLE Tem ADD CONSTRAINT FK_Tem_1
    FOREIGN KEY (fk_Cliente_ID_CLIENTE)
    REFERENCES Cliente (ID_CLIENTE)
    ON DELETE RESTRICT;
 
ALTER TABLE Tem ADD CONSTRAINT FK_Tem_2
    FOREIGN KEY (fk_Pet_ID_PET)
    REFERENCES Pet (ID_PET)
    ON DELETE SET NULL;
 
ALTER TABLE Frequenta ADD CONSTRAINT FK_Frequenta_1
    FOREIGN KEY (fk_Cliente_ID_CLIENTE)
    REFERENCES Cliente (ID_CLIENTE)
    ON DELETE SET NULL;
 
ALTER TABLE Frequenta ADD CONSTRAINT FK_Frequenta_2
    FOREIGN KEY (fk_Petshop_ID_PETSHOP)
    REFERENCES Petshop (ID_PETSHOP)
    ON DELETE SET NULL;
 
ALTER TABLE Tratamento ADD CONSTRAINT FK_Tratamento_1
    FOREIGN KEY (fk_Servico_ID_SERVICO)
    REFERENCES Servico (ID_SERVICO)
    ON DELETE SET NULL;
 
ALTER TABLE Tratamento ADD CONSTRAINT FK_Tratamento_2
    FOREIGN KEY (fk_Pet_ID_PET)
    REFERENCES Pet (ID_PET)
    ON DELETE SET NULL;
 
ALTER TABLE Trabalho ADD CONSTRAINT FK_Trabalho_1
    FOREIGN KEY (fk_Petshop_ID_PETSHOP)
    REFERENCES Petshop (ID_PETSHOP)
    ON DELETE SET NULL;
 
ALTER TABLE Trabalho ADD CONSTRAINT FK_Trabalho_2
    FOREIGN KEY (fk_Servico_ID_SERVICO)
    REFERENCES Servico (ID_SERVICO)
    ON DELETE SET NULL;
```
