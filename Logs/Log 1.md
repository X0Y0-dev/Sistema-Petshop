# Organização de Dados
<p>Assim que o projeto foi iniciado, me garanti de criar o sistema de relações utilizando o software BrModelo.</p>
<p align="center"><img src="https://github.com/user-attachments/assets/96c4b56e-899d-4576-b7db-c2d78da69d82"></p>
<p>Dentro do BrModelo, criei as seguintes entidades:</p>

```
● Cliente:
  ° ID_CLIENTE (identificador)--------------------INT PRIMARY KEY AUTO_INCREMENT
  ° NOME------------------------------------------VARCHAR(50) NOT NULL
  ° SOBRENOME-------------------------------------VARCHAR(50) NOT NULL
  ° TELEFONE--------------------------------------VARCHAR(20) NOT NULL
  ° CPF-------------------------------------------VHARCHAR(11)
  ° EMAIL-----------------------------------------VARCHAR(255)

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
  ° DIAS_FUNC-------------------------------------VARCHAR(20)
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
Cliente (1,n) TEM (0,n) Pet
  Cliente (1,n) -> Um pet, para ser um pet, necessariamente precisa ter um dono, porém, o mesmo pet pode ter
  vários donos
  Pet (0,n) -> ~Um cliente não necessariamente precisa ter um pet, assim como pode ter diversos

Cliente (0,n) FREQUENTE (0,n) Petshop
  Cliente (0,n) -> Um petshop pode acabar não tendo clientes, assim como pode ter vários
  Petshop (0,n) -> Uma pessoa pode não ir a um petshop, assim como pode ir a vários

Pet (0,n) TRATAMENTO (0,n) Servico
  Pet (0,n) -> Um serviço não precisa de um pet para existir, porém, ele pode atender vários pets
  Servico (0,n) -> Um pet não precisa recorrer a um serviço, assim como pode receber diversos tratamentos

Petshop (0,n) TRABALHO (0,n) Servico
  Petshop (0,n) -> Um serviço pode muito bem ser executado fora de um petshop, assim como pode ser feito em vários
  petshops
  Servico (0,n) -> Um petsho não precisa oferecer serviços, mas também pode oferecer vários.
```
<p align="center"><img src="https://github.com/user-attachments/assets/4ecd18e0-ede8-47a8-8a6c-492244696316"></p>

